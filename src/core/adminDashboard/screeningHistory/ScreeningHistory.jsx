import { NavLink } from 'react-router-dom'
import style from './style.module.scss'
import { ScreeningHistoryTable } from './screeningHistoryTable/ScreeningHistoryTable'
import { useScreeningHistory } from './useScreeningHistory'
import { Loader } from '../../loader/Loader';

export function ScreeningHistory() {
    const {
        isLoad,
        requests
    } = useScreeningHistory();
    
    if (isLoad)
        return <Loader isLoad="true"></Loader>

    return <div className={style.root}>
        <NavLink to="/" className={style.back}>Back</NavLink>
        <h1>Admin Dashboard</h1>
        <div className="divider"></div>
        <ScreeningHistoryTable data={requests}></ScreeningHistoryTable> 

    </div>
}