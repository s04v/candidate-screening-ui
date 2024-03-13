import { useEffect, useState } from 'react';
import style from './style.module.scss';
import { NavLink, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { format } from 'date-fns';
import { backend } from '../../../../infra/backend';
import toast from 'react-hot-toast';

export function CandidateTable(props) {
    const navigate = useNavigate();
    const { jobId } = useParams();

    const [currentPage, setCurentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    
    const [data, setData] = useState(props.data.slice(0, rowsPerPage));

    const [rowsPerPageMenuOpen, setRowsPerPageMenuOpen] = useState(false);

    const [selectedRows, setSelectedRows] = useState(props.selectedCandidates);

    const outsideMenuClick = () => {
        setRowsPerPageMenuOpen(false);
        document.removeEventListener("click", outsideMenuClick, false);
    }
    
    const openMenu = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setRowsPerPageMenuOpen(true);
        document.addEventListener("click", outsideMenuClick, false);
    }

    const selectRowsPerPage = (rows) => {
        setRowsPerPage(rows);
    }

	const isSelected = (id) => {
        return selectedRows.includes(id)
    };

    const handleSelectAllClick = () => {
		if (selectedRows.length === data.length) {
			setSelectedRows([]);
		} else {
			const allRecordId = data.map((item) => item._id);

			setSelectedRows(allRecordId);
		}

        console.log(selectedRows);
	};

	const handleSelect = (e, item) => {
        e.stopPropagation();

		if (!isSelected(item._id)) {
            backend.
                post(`/job/${jobId}/candidate/${item._id}`);

            setSelectedRows([...selectedRows, item._id]);
            toast.success("Candidate addded");
		} else {
            backend.remove(`/job/${jobId}/candidate/${item._id}`);

			const newSelected = selectedRows.filter(
				(selectedId) => selectedId !== item._id
			);

			setSelectedRows(newSelected);

            toast.error("Candidate removed");

		}
	};

    useEffect(() => {
        setData(props.data.slice(0, rowsPerPage))
    }, [rowsPerPage])

    const changePage = (page) => {
        if (page < 0)
            return;
        const totalPage = props.data.length / rowsPerPage;
        if (page < totalPage) {
            setCurentPage(page);

            const start = rowsPerPage * page;
            setData(props.data.slice(start, start + rowsPerPage));
        } 
    }

    const removeCandidate = (candidateId) => {
        backend.remove(`/job/${jobId}/candidate/${candidateId}`);

			const newSelected = selectedRows.filter(
				(selectedId) => selectedId !== candidateId
			);

			setSelectedRows(newSelected);

            toast.error("Candidate removed");
    } 

    const addCandidate = (candidateId) => {
        backend.
            post(`/job/${jobId}/candidate/${candidateId}`);

        setSelectedRows([...selectedRows, candidateId]);
        toast.success("Candidate addded");
     }

    return <div className={style.root}>
        <table>
            <tr class="head">
                <th align="start" style={{ width: '20%'}}>Created Date</th>
                <th align="start" style={{ width: '20%'}}>First Name</th>
                <th align="start" style={{ width: '20%'}}>Last Name</th>
                <th align="start" style={{ width: '20%'}}>Email</th>
                <th align="start" style={{ width: '20%'}}>Source</th>
                <th align="start" style={{ width: '20%'}}></th>
            </tr>
            {data.length ? data.map(item => <>
                <tr class="tableRow">
                    <td>{format(new Date(item.createdAt), 'dd/MM/yyyy')}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.email}</td>
                    <td>{item.source}</td>
                    <td className={style.buttons}>
                        {isSelected(item._id) ?
                        <button class="red-btn" onClick={() => removeCandidate(item._id)}>Remove</button>
                            :
                        <button class="second-btn" onClick={() => addCandidate(item._id)}>Add</button>
                        }
                    </td>
                </tr>
            </>) : ""}
        </table>
        <div class="tableFooter">
            <p>
                Rows per page: 
            </p>
            <p onClick={openMenu} class="rowsPerPage">
                {rowsPerPage}
                <img src="/img/down-arrow.svg"/>
            </p>
            <div class={`rowsPerPageList ${rowsPerPageMenuOpen ? "openMenu" : ''} `}>
                <p onClick={() => selectRowsPerPage(5)}>5</p>
                <p onClick={() => selectRowsPerPage(10)}>10</p>
                <p onClick={() => selectRowsPerPage(15)}>15</p>
            </div>
            <p>1-{rowsPerPage} of {props.data.length}</p>
            <img src="/img/left-arrow.svg" onClick={() => changePage(currentPage - 1)}/>
            <img src="/img/right-arrow.svg" onClick={() => changePage(currentPage + 1)}/>

        </div>

    </div>
}