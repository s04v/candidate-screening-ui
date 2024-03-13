import { NavLink, useParams } from 'react-router-dom';
import style from './style.module.scss'; 
import Backend from '../../infra/backend';
import backend from '../../infra/backend';
import { useCandidateScreening } from './useCandidateScreening';
import { Loader } from '../loader/Loader';

export const CandidateScreening = () => {
    const { jobId } = useParams();

    const { screening, candidate, analyze } = useCandidateScreening();

    if (!candidate)
        return <Loader isLoad={true} />

    return <div  className={style.root}>
        <NavLink to={`/job/${jobId}`} className={style.back}>Back</NavLink>
        <div className={style.header}>
            <div>
                <h1 >
                    {screening ? "Results: " : ""}
                    {candidate.firstName} {candidate.lastName}</h1>
            </div>
            <h1 className={style.score}> {screening ? screening.score : "0"} / 100</h1>
        </div>
        <div className="divider"></div>
        {!screening ? <div className={style.banner}>
            <h3>Good news, this candidate is ready for screening!</h3>
            <div>
                <p>
                    Screening might take up to 1 minute to complete so sit back and relax, and grab yourself a hot drink and let us do the magic.
                </p>
                
                <div>
                    <div className={style.ldsEllipsis} id="lds-ellipsis">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <button id="analyzeButton" onClick={analyze}>Analyze Now</button>
                </div>
            </div>
        </div> : ""}

        <h3>Experience</h3>
        {screening ? 
            <div className={style.criteriaResult}>
                {screening.experience}
            </div> 
        : 
            <div className={`${style.placeholder} ${style.inactive}`}>
                <div className={style.animatedBackground}></div><br />
                <div className={style.animatedBackground}></div>
            </div>
        }

        <h3>Skillset</h3>
        {screening ? 
            <div className={style.criteriaResult}>
                {screening.skillset}
            </div> 
        : 
            <div className={`${style.placeholder} ${style.inactive}`}>
                <div className={style.animatedBackground}></div><br />
                <div className={style.animatedBackground}></div>
            </div>
        }

        <h3>Qualifications</h3>
        {screening ? 
            <div className={style.criteriaResult}>
                {screening.qualifications}
            </div> 
        : 
            <div className={`${style.placeholder} ${style.inactive}`}>
                <div className={style.animatedBackground}></div><br />
                <div className={style.animatedBackground}></div>
            </div>
        }

        <h3>Summary</h3>
        {screening ? 
            <div className={style.summary}>
                {screening.summary}
            </div>
        : 
            <div className={`${style.placeholder} ${style.inactive}`}>
                <div className={style.animatedBackground}></div><br />
                <div className={style.animatedBackground}></div><br />
                <div className={style.animatedBackground}></div><br />
                <div className={style.animatedBackground}></div>
            </div>
        }
    </div>
}