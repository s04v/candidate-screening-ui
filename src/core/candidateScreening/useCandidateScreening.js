import { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { backend } from "../../infra/backend";
import toast from 'react-hot-toast';

export const useCandidateScreening = () => {
    const navigate = useNavigate();
    const isFirstScreening = window.location.pathname.endsWith('screening');

    const { jobId, candidateId, screeningId } = useParams();
    const [candidate, setCandidate] = useState(null);
    const [screening, setScreening] = useState(null);

    useEffect(() => {
        backend
            .get(`/candidate/${candidateId}`)
            .then(res => {
                setCandidate(res);
            });
        
        if (!isFirstScreening) {
            const data = {
                jobId,
                candidateId
            };

            backend
                .post(`/request`, data)
                .then(res => {
                    setScreening(res);
                });
        }

    }, []);

    const analyze = async () => {
        document.getElementById("analyzeButton").style.display = "none";
        document.querySelector("#lds-ellipsis").style.setProperty('display', 'flex', "important")

        const data = {
            jobId,
            candidateId
        };

        backend.post(`/analyze`, data)
            .then(res => {
                window.location.href = `/job/${jobId}/candidate/${candidate._id}`;

                //navigate(`/job/${jobId}/candidate/${candidate._id}`)
            })
            .catch(err => {
                toast.error(err.error);
                document.getElementById("analyzeButton").style.display = "block";
                document.querySelector("#lds-ellipsis").style.setProperty('display', 'none', "important");
            })
    };

    return {
        candidate,
        screening,
        analyze,
    }
}