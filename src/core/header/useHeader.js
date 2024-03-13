import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { backend } from "../../infra/backend";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useHeader = () => {
    const navigate = useNavigate();
    
    const [user, setUser] = useState(null);
    const [isLoad, setIsLoad] = useState(false);

    useEffect(() => {
        backend
            .get('/user/me')
            .then(res => setUser(res));
    }, []);

    const logout = () => {
        const cookie = new Cookies();
        cookie.remove("jwt");
        navigate("/signin");
    }

    const purchaseCredits = async () => {
        setIsLoad(true);
        backend
            .post('/user/purchaseCredits')
            .then(res => {
                backend
                    .get('/user/me')
                    .then(res => {
                        toast.success("Purchase was successful");
                        setIsLoad(false);
                        setUser(res);
                    });
            })
            .catch(err => {
                toast.error(err.error);
                setIsLoad(false);
            });
    }

    return {
        logout,
        user,
        purchaseCredits,
        isLoad
    }
}