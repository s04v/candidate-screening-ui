import { useEffect, useState } from "react"
import { backend } from "../../infra/backend";
import { useParams } from "react-router-dom";

export const useCandidatePreview = () => {
    const { candidateId } = useParams();
    const [isLoad, setIsLoad] = useState(false);
    const [candidate, setCandidates] = useState([]);
    const [screeningHistory, setScreeningHistory] = useState([]);
    
    useEffect(() => {
        setIsLoad(true);
        backend
            .get(`/candidate/${candidateId}`)
            .then(res => {
                setCandidates(res);
            });

        backend
            .get(`/request/history/${candidateId}`)
            .then(res => {
                setScreeningHistory(res);
                setIsLoad(false);
            });
    }, []); 


    return {
        candidate,
        screeningHistory,
        isLoad
    };
}