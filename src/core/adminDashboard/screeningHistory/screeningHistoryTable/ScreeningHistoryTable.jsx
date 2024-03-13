import { useEffect, useState } from 'react';
import style from './style.module.scss';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { format, intervalToDuration } from 'date-fns';

export function ScreeningHistoryTable(props) {
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

    function secondsToMMSS(seconds) {
        var minutes = Math.floor(seconds / 60);
        var remainingSeconds = seconds % 60;
      
        // Add leading zero if necessary
        minutes = minutes < 10 ? '0' + minutes : minutes;
        remainingSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
      
        return minutes + ':' + remainingSeconds;
    }


    useEffect(() => {
        const table = document.getElementById("allScreeningTable");

        const scrollHandler = (e) => {
            const target = e.target;

            const leftShadow = document.getElementById("leftShadow");
            const rightShadow = document.getElementById("rightShadow");

            console.log("target.scrollLeft", target.scrollLeft)
            console.log("target.clientWidth", target.clientWidth)
            console.log("target.scrollWidth", target.scrollWidth)

            if(target.scrollLeft + target.clientWidth >= target.scrollWidth - 10) {
                rightShadow.style.visibility = "hidden";
            } else {
                rightShadow.style.visibility = "visible";
            }

            if(target.scrollLeft === 0) {
                leftShadow.style.visibility = "hidden";
            } else {
                leftShadow.style.visibility = "visible";
            }
        }

        table.addEventListener("scroll", scrollHandler);

        return () => {
            table.removeEventListener("scroll", scrollHandler);
        }
    }, []);
    return <div className={style.root}>
        <div className={style.tableShadow}>
            <div className={style.rightShadow} id="rightShadow"></div>
            <div className={style.leftShadow} id="leftShadow"></div>
        <table id="allScreeningTable">
            <tr class="head">
                <th align="start">Timestamp</th>
                <th align="start">Request ID</th>
                <th align="start">User ID</th>
                <th align="start">Job ID</th>
                <th align="start">Candidate ID</th>
                <th align="start">Elapsed Time</th>
                <th align="start">Prompt Tokens</th>
                <th align="start">Completion Tokens</th>
                <th align="start">Total Tokens</th>
                <th align="start">Model</th>
                <th align="start">Cost</th>
            </tr>
            {data.length ? data.map(item => <>
            {console.log(intervalToDuration({ start: 0, end: item.elapsedTime * 1000 }))}
                <tr class="tableRow" onClick={() => navigate(`request/${item._id}`)}>
                     <td>{format(new Date(item.createdAt), 'dd/MM/yyyy HH:mm:ss')}</td> 
                    <td>{item._id}</td>
                    <td>{item.userId}</td>
                    <td>{item.jobId}</td>
                    <td>{item.candidateId}</td>
                    <td>{secondsToMMSS(item.elapsedTime)}</td>
                    <td>{item.promptTokensCount}</td>
                    <td>{item.completionTokensCount}</td>
                    <td>{item.totalTokens}</td>
                    <td>{item.model}</td>
                    <td>${item.cost}</td>

                </tr>
            </>) : ""}
        </table>
        </div>
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