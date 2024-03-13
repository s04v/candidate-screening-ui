import style from './style.module.scss';
import { AllJobsTable } from './allJobsTable/AllJobsTable';
import { NavLink } from 'react-router-dom';
import { useDashboard } from './useDashboard';
import { AllScreeningTable } from './allScreeningTable/AllScreeningTable';
import { Loader } from '../loader/Loader';
import { AllCandidateTable } from './allCandidatesTable/AllCandidateTable';
import { CandidateApplicationsTable } from './candidateAppliactionsTable/CandidateApplicationsTable';

export function Dashboard() {
    const { totalJobs, screenings, candidates, isLoad, user, applications, greenHousAuth } = useDashboard();

    if (isLoad)
        return <Loader isLoad={true}/>;

    return <div className={style.root}>
        <h1>Dashboard</h1>
        <div className="divider"></div>
        <h3>Candidate Applications</h3>
        {applications.length ? <CandidateApplicationsTable data={applications}></CandidateApplicationsTable> : "" }
        <br />
        <div className={style.yourJob}>
            <h3>Your Job</h3>
            <NavLink to="/newJob"> 
                <button>Add New Job</button>
            </NavLink>
        </div>
        {totalJobs.length ? <AllJobsTable data={totalJobs}></AllJobsTable> : "" }

        { user && !user.greenHouseUserId ? <div className={style.greenHouseBanner}>
            <h2>Connect to Greenhouse</h2>
            <p>
                ScreenrAI seamlessly integrates with Greenhouse to streamline your recruitment process. Harness the power of advanced AI to analyze candidate resumes, providing you with insights and quicker shortlisting capabilities. Enhance your hiring decisions with ScreenrAI — the smart, efficient way to connect with your ideal candidates.
            </p>
            <NavLink to="/settings"> 
                <button>Connect</button>
            </NavLink>
        </div> : "" }
        <div className={style.yourCandidates}>
            <h3>Your Candidates</h3>
            <NavLink to="/newCandidate"> 
                <button>Add New Candidate</button>
            </NavLink>
        </div>
        {candidates.length ? <AllCandidateTable data={candidates}></AllCandidateTable> : "" }

        <h3>Screening History</h3>
        {screenings.length ? <AllScreeningTable data={screenings}></AllScreeningTable> : "" }
    </div>
}

