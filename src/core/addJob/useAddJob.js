import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { backend } from "../../infra/backend";
import { useNavigate, useParams } from "react-router-dom";
import toast from 'react-hot-toast';

export const useAddJob = () => {
    const navigate = useNavigate();

    const isEdit = window.location.pathname.endsWith('edit');
    const { jobId } = useParams();

    const initForm = {
        name: "",
        responsibilities: "",
        experience: "",
        qualifications: ""
    };

    const formik = useFormik({
		// validateOnChange: false,
		enableReinitialize: true,
		initialValues: initForm,
		onSubmit: async (values) => {
            if (isEdit) {
                await backend.put(`/job/${jobId}`, values);
                toast.success("Job updated");
            }
            else {
                await backend.post('/job', values);
                toast.success("Job created");
            }
            navigate("./..")
		},
	});

    useEffect(() => {
        if (isEdit) {
            backend
                .get(`/job/${jobId}`)
                .then(res => {
                    const jobValue = {
                        name: res.name,
                        responsibilities: res.responsibilities,
                        experience: res.experience,
                        qualifications: res.qualifications,
                    };
                    
                    formik.setValues(jobValue);
                });
        }
    }, []);

    const cancel = (e) => {
        e.preventDefault();
        e.stopPropagation();

        navigate(-1);
    }

    return {
        isEdit,
        formik,
        cancel
    };
}