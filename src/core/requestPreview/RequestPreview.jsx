import style from './style.module.scss';
import { NavLink } from 'react-router-dom';
import { Loader } from '../loader/Loader';
import { useRequestPreview } from './useRequestPreview';
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';
import ReactJson from 'react-json-view'

export function RequestPreview() {
    const { request } = useRequestPreview();

    function secondsToMMSS(seconds) {
        var minutes = Math.floor(seconds / 60);
        var remainingSeconds = seconds % 60;
      
        minutes = minutes < 10 ? '0' + minutes : minutes;
        remainingSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
      
        return minutes + ':' + remainingSeconds;
    }

    if (!request)
        return <Loader isLoad={true} />

    console.log(request);

    return <div className={style.root}>
        <h3 className={style.headerText}>Admin Dashboard</h3> 
        <NavLink to="./../.." className={style.back}>Back</NavLink>

        <div className={style.header}>
            <div>
                <h4>Request ID</h4>
                <h3>{request._id}</h3>
            </div>
            <div>
                <h4>Elapsed Time</h4>
                <h3>{secondsToMMSS(request.elapsedTime)}</h3>
            </div>
            <div>
                <h4>Cost</h4>
                <h3>${request.cost.toFixed(8)}</h3>
            </div>
        </div>

        <div className="divider"></div>

        <div className={style.row}>
            <div>
                <span>User ID</span>
                <p>{request.userId}</p>
            </div>
            <div>
                <span>Job ID</span>
                <p>{request.jobId}</p>
            </div>
            <div>
                <span>Candidate ID</span>
                <p>{request.candidateId}</p>
            </div>
        </div>

        <div className={style.row}>
            <div>
                <span>Prompt Tokens</span>
                <p>{request.promptTokensCount}</p>
            </div>
            <div>
                <span>Completion Tokens</span>
                <p>{request.completionTokensCount}</p>
            </div>
            <div>
                <span>Total Tokens</span>
                <p>{request.totalTokens}</p>
            </div>
        </div>

        <div className={style.row}>
            <div>
                <span>Model</span>
                <p>{request.model}</p>
            </div>
            <div>
                <span>Temperature</span>
                <p>{request.temperature}</p>
            </div>

            <div style={{ visibility: "hidden" }}>
                <span>Idle</span>
                <p>{request.completionTokensCount}</p>
            </div>
        </div>

        <div className={style.jsons}>
            <div>
                <h3>Request</h3> 

                <div className={style.jsonBox}>
                    <ReactJson 
                        theme={"shapeshifter:inverted"}
                        src={request.requestJson} 
                        enableClipboard={false}
                        displayObjectSize={false}
                        displayDataTypes={false}
                        />
                </div>
            </div>
            
            <div>
                <h3>Response</h3> 
                
                <div className={style.jsonBox}>
                    <ReactJson 
                        theme={"shapeshifter:inverted"}
                        src={request.responseJson} 
                        enableClipboard={false}
                        displayObjectSize={false}
                        displayDataTypes={false}
                        />
                </div>
            </div>
        </div>
    </div>
}