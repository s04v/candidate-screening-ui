import { useEffect, useState } from 'react';
import style from './style.module.scss';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { format } from 'date-fns';
import { backend } from '../../../infra/backend';
import { toast } from 'react-hot-toast';

export function CandidateApplicationsTable(props) {
    const navigate = useNavigate();
    const [currentPage, setCurentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    
    const [data, setData] = useState(props.data.slice(0, rowsPerPage));

    const [rowsPerPageMenuOpen, setRowsPerPageMenuOpen] = useState(false);

    const [selectedRows, setSelectedRows] = useState([]);

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

	const handleSelect = (item) => {
		if (!isSelected(item._id)) {
            setSelectedRows([...selectedRows, item._id])
		} else {
			const newSelected = selectedRows.filter(
				(selectedId) => selectedId !== item._id
			);

			setSelectedRows(newSelected);
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

    const getScoreColor = (score) => {
        if (score === "-")
            return '';

        if(score <= 30) 
            return style.redScore; 

        if(score <= 70) 
            return style.yellowScore;
            
        return style.greenScore; 
    }

    const analyze = async (e, candidateId, jobId) => {
        const ellipsis = e.target.parentElement.childNodes[0];
        const button = e.target;
        
        button.style.display = "none";
        ellipsis.style.setProperty('display', 'flex', "important");

        
        const analyzeData = {
            jobId,
            candidateId
        };

        backend.post(`/analyze`, analyzeData)
            .then(res => {
                const candidates = [ ...data ];
                const index = candidates.findIndex(c => c.candidateId === candidateId);
                candidates[index].score = res.score;

                setData(candidates);
                toast.success("Success");
                ellipsis.style.setProperty('display', 'none', "important");

                //navigate(`/job/${jobId}/candidate/${candidate._id}`)
            })
            .catch(err => {
                toast.error(err.error);
                button.style.display = "block";
                ellipsis.style.setProperty('display', 'none', "important");
                
            })
    }
    

    return <div className={style.root}>
        <table>
            <tr class="head">
                <th align="start" style={{ width: '20%'}}>Name</th>
                <th align="start" style={{ width: '20%'}}>Job</th>
                <th align="start" style={{ width: '20%'}}>Applied Date</th>
                <th align="start" style={{ width: '20%'}}>Source</th>
                <th align="start" style={{ width: '20%'}}>Score</th>
                <th align="start" style={{ width: '20%'}}></th>
            </tr>
            {data.length ? data.map(item => <>
                <tr class="tableRow">
                    <td>{item.name}</td>
                    <td>{item.job}</td>
                    <td>{format(new Date(item.appliedDate), 'dd/MM/yyyy')}</td>
                    <td>{item.source}</td>
                    <td>
                        <div className={`${style.score} ${getScoreColor(item.score)}`}>
                            {item.score}
                        </div>
                    </td>
                    <td>
                        {item.score !== "-" ? 
                            <NavLink to={`/job/${item.jobId}/candidate/${item.candidateId}`}>
                                <button class="second-btn">Results</button>
                            </NavLink>
                        : 
                        <div>
                            <div className={`${style.ldsEllipsis}`} id="lds-ellipsis">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                            <button id="analyzeButton" onClick={(e) => analyze(e, item.candidateId, item.jobId)}>Analyze</button>
                        </div>}
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