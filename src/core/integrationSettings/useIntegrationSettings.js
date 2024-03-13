import Cookies from "universal-cookie";
import { backend } from "../../infra/backend";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useIntegrationSettings = () => {
    const [user, setUser] = useState(null);
    const [openEditToken, setOpenEditToken] = useState(false);
    const [token, setToken] = useState(null);
    const [autoScreening, setAutoScreening] = useState(false);
    const [temperature, setTemperature] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        backend
            .get('/user/me')
            .then(res => {
                setUser(res)
                setToken(res.greenHouseToken);
                setAutoScreening(res.autoScreening);
                setTemperature(res.gptTemperature);
            });
    }, []);

    const greenHousAuth = async () => {
        if (user.subscription.type === "Business") {
            const cookie = new Cookies();
            const token = cookie.get("jwt");

            window.location.href = `https://mxkcp2drs5.eu-central-1.awsapprunner.com/auth?token=${token}`
        }
    }

    const disconnect = async () => {
        backend
            .remove('/auth')
            .then(res => navigate(0));
    }

    const saveToken = () => {
        setOpenEditToken(false);

        console.log(btoa(`${token}:`));
        const data = {
            greenHouseToken: btoa(`${token}:`)
        };

        backend
            .put('/user/me', data);
    }

    const editToken = () => {
        setOpenEditToken(true)
    }

    const updateAutoScreening = () => {
        const data = {
            autoScreening: !autoScreening
        };
        
        backend
            .put('/user/me', data)
            .then(res => setAutoScreening(!autoScreening));
    }

    const deleteAccount = () => {
        backend
            .remove('/user/me')
            .then(res => {
                toast.success("Account deleted");
                const cookie = new Cookies();
                cookie.remove("jwt");
                navigate("/signin");
            });
    }

    const updateModel = (model) => {
        const data = {
            gptModel: model
        };
        
        backend
            .put('/user/me', data);
    }

    const onTemperatureChange = (temp) => {
        setTemperature(temp);

        if (isNaN(temp) || !temp) {
            return;
        }

        let numTemperature = parseFloat(temp);

        if (temp < 0) {
            setTemperature(0);
            numTemperature = 0;
        } else if (temp > 2) {
            setTemperature(2);
            numTemperature = 2;
        } else {
            setTemperature(numTemperature);
        }

        const data = {
            gptTemperature: numTemperature
        }

        backend
            .put("/user/me", data);
    }

    return {
        greenHousAuth,
        user,
        openEditToken,
        editToken,
        saveToken,
        token,
        setToken,
        disconnect,
        autoScreening,
        updateAutoScreening, 
        deleteAccount,
        updateModel,
        temperature,
        onTemperatureChange
    }
}