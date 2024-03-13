import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export function AuthGuard(props) {
    const navigate = useNavigate();

    useEffect(() => {
        const cookies = new Cookies();
        const token = cookies.get("jwt");
        if (token === undefined) {
            return navigate("/signin");
        }

        const decodedJwt = JSON.parse(atob(token.split('.')[1]))
        console.log(decodedJwt);
        if (decodedJwt.exp * 1000 < Date.now()) {
            cookies.remove("jwt");
            return navigate("/signin");
        }
    }, []);
    
    return props.children
}