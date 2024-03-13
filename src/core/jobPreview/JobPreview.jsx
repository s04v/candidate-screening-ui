import style from './style.module.scss';
import { Table } from '../dashboard/allJobsTable/AllJobsTable';
import { NavLink } from 'react-router-dom';
import { useJobPreview } from './useJobPreview';
import { CandidateTable } from './candidateTable/CandidateTable';
import { Loader } from '../loader/Loader';

export function JobPreview() {
    const { job, candidates } = useJobPreview();

    if (!job)
        return <Loader isLoad={!job} />

    return <div className={style.root}>
        <NavLink to="./../.." className={style.back}>Back</NavLink>
        <h1>{job.name}</h1>
        <div className="divider"></div>
        <div className={style.header}>
            <h3>Hiring Criteria</h3>
            <NavLink to="edit">
                <button>Edit</button>
            </NavLink>
        </div>

        <h3>Responsibilities</h3>
        <p className={style.criteria}>
            {job.responsibilities}
        </p>

        <h3>Experience</h3>
        <p className={style.criteria}>
            {job.experience}
        </p>

        <h3>Qualifications</h3>
        <p className={style.criteria}>
            {job.qualifications}
        </p>
        
        <div className={style.header}>
            <h3>Candidate Results</h3>
            <NavLink to="addCandidate">
                <button>Add New Candidate</button>
            </NavLink>
        </div>
        { candidates.length ? <CandidateTable data={candidates}></CandidateTable> : "" }
    </div>
}