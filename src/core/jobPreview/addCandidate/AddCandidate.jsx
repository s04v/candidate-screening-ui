import { CandidateTable } from './candidatesTable/CandidateTable';
import style from './style.module.scss';
import { NavLink } from 'react-router-dom';
import { useAddCandidate } from './useAddCandidate';
import { Loader } from '../../loader/Loader';

export const AddCandidate = () => {
    const { allCandidates, selectedCandidates, isLoad } = useAddCandidate();
   
    if (isLoad) 
        return <Loader isLoad={true} />

    return <div className={style.root}>
        <NavLink to="./.." className={style.back}>Back</NavLink>
        <div className="divider"></div>
        <h3>Select Candidate</h3>

        { allCandidates.length ?  <CandidateTable data={allCandidates} selectedCandidates={selectedCandidates}></CandidateTable> : "" }

        <div className={style.header}>
            <h3>Add New Candidate</h3>
            <NavLink to="create">
                <button>Add New Candidate</button>
            </NavLink>
        </div>
    </div>
}