import { useEffect, useState } from "react";
import { backend } from "../../../infra/backend";

export function useScreeningHistory() {
    const [requests, setRequests] = useState([]);
    const [isLoad, setIsLoad] = useState(false);

    useEffect(() => {
        setIsLoad(true);
        backend
            .get("/request/all")
            .then((res) => {
                setRequests(res);
                setIsLoad(false);

            }, 
            (err) => {
                setIsLoad(false);
            })
    }, []);

    return {
        requests,
        isLoad
    }
}