import { useEffect, useState } from "react";
import { backend } from "../../infra/backend";
import Cookies from "universal-cookie";

export const useDashboard = () => {
    const [totalJobs, setTotalJobs] = useState([]);
    const [screenings, setScreenings] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [isLoad, setIsLoad] = useState(false);
    const [user, setUser] = useState(null);

    const [applications, setApplications] = useState([]);

    useEffect(() => {
        setIsLoad(true);

        backend
            .get('/job')
            .then(res => {
                setTotalJobs(res);
            });

        backend
            .get('/request')
            .then(res => {
                setScreenings(res);
            });

        backend
            .get('/candidate')
            .then(res => {
                setCandidates(res);
                setIsLoad(false);
            });

        backend
            .get('/user/me')
            .then(res => {
                setUser(res);
            });

        backend
            .get('/job/applications')
            .then(res => {
                setApplications(res);
            });
    }, []);
    
    const greenHousAuth = async () => {
        if (user.subscription.type === "Business") {
            const cookie = new Cookies();
            const token = cookie.get("jwt");

            window.location.href = `https://mxkcp2drs5.eu-central-1.awsapprunner.com/auth?token=${token}`
        }
    }

    return {
        totalJobs,
        screenings,
        candidates,
        isLoad,
        user,
        greenHousAuth,
        applications
    };
}