import { useEffect, useState } from "react";
import { backend } from "../../../infra/backend";
import { useParams } from "react-router-dom";

export const useAddCandidate = () => {
    const [isLoad, setIsLoad] = useState(false);
    const [allCandidates, setAllCandidates] = useState([]);
    const [selectedCandidates, setSelectedCandidates] = useState([]);

    const { jobId } = useParams();

    useEffect(() => {

        setIsLoad(true);

        backend
            .get(`/candidate`)
            .then(res => {
                setAllCandidates(res);
            });

        backend
            .get(`/job/${jobId}/candidate`)
            .then(res => {
                const ids = res.map(item => item._id);
                setSelectedCandidates(ids);
                setIsLoad(false);

            });
    }, []);

    return {
        allCandidates,
        selectedCandidates,
        isLoad
    };
}