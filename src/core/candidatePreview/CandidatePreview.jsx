import style from './style.module.scss';
import { Table } from '../dashboard/allJobsTable/AllJobsTable';
import { NavLink } from 'react-router-dom';
import { CandidateTable } from '../jobPreview/candidateTable/CandidateTable';
import { Loader } from '../loader/Loader';
import { useCandidatePreview } from './useCandidatePreview';
import { ScreeningTable } from './screeningTable/ScreeningTable';

export function CandidatePreview() {
    const { candidate, screeningHistory, isLoad } = useCandidatePreview();

    if (isLoad)
        return <Loader isLoad={true} />

    return <div className={style.root}>
        <NavLink to="./../.." className={style.back}>Back</NavLink>
        <h1>{candidate.firstName} {candidate.lastName}</h1>
        <div className="divider"></div>
        <div className={style.header}>
            <h3>Candidate Profile</h3>
            <NavLink to="edit">
                <button>Edit</button>
            </NavLink>
        </div>

        <h3>Resume</h3>
        <p className={style.criteria}>
            {candidate.resume}
        </p>

        <h3>Screening History</h3>
        { screeningHistory.length ? <ScreeningTable data={screeningHistory}></ScreeningTable> : "" } 
    </div>
}