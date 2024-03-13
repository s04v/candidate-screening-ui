import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { backend } from "../../infra/backend";

export const useSignUp = () => {
    const navigate = useNavigate();

    const initForm = {
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        password: "",
        confirmPassword: "",
    };

    const formik = useFormik({
		// validateOnChange: false,
		enableReinitialize: true,
		initialValues: initForm,
		onSubmit: async (values) => {
            if (values.confirmPassword != values.password) {
                toast.error("Passwords do not match");
                return;
            }

            backend
                .post("/signup", values)
                .then(res => {
                    toast.success("Success");

                    setTimeout(() => navigate(`/signin`), 1000);
                },
                err => {
                    console.log(err);

                    //toast.error(err.error);
                });
		},
	});

    return {
        formik
    }
}