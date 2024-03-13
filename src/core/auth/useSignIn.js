import { useFormik } from "formik";
import { backend } from "../../infra/backend";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export const useSignIn = () => {
    const navigate = useNavigate();

    const initForm = {
        email: "",
        password: "",
    };

    const formik = useFormik({
		// validateOnChange: false,
		enableReinitialize: true,
		initialValues: initForm,
		onSubmit: async (values) => {
            backend
                .post("/signin", values)
                .then(res => {
                    toast.success("Success");
                    
                    const token = res.token;
                    const cookie = new Cookies();
                    cookie.set("jwt", token);

                    setTimeout(() => navigate(`/`), 1000);
                },
                err => {
                    toast.error(err.error);
                });
		},
	});

    return {
        formik
    }
}