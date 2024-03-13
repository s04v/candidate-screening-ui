import { useEffect, useState } from "react";
import { backend } from "../../infra/backend";
import { useParams } from "react-router-dom";

export const useRequestPreview = () => {
    const { requestId } = useParams();

    const [request, setRequest] = useState(null);

    useEffect(() => {
        backend
            .get(`/request/${requestId}`)
            .then((res) => {
                setRequest(res);

            });
    }, []);

    return {
        request,
    }
}