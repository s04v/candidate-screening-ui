import { useEffect, useState } from "react"
import { backend } from "../../infra/backend";
import { useParams } from "react-router-dom";

export const useJobPreview = () => {
    const { jobId } = useParams();
    const [job, setJob] = useState(null);
    const [candidates, setCandidates] = useState([]);
    
    useEffect(() => {
        backend
            .get(`/job/${jobId}`)
            .then(res => {
                setJob(res);
            });

        backend
            .get(`/job/${jobId}/candidate`)
            .then(res => {
                setCandidates(res);
            });
    }, []); 


    return {
        job,
        candidates
    };
}