import { NavLink } from 'react-router-dom';
import style from './style.module.scss';
import { useAddJob } from './useAddJob';
import { useState } from 'react';
import { Field, Form, Formik, FormikProvider } from 'formik';

export function AddJob() {
    const [name, setName] = useState("");
    const [responsibilities, setResponsibilities] = useState("");
    const [experience, setExperience] = useState("");
    const [qualifications, setQualifications] = useState("");

    const { formik, isEdit, cancel } = useAddJob();

    return <div className={style.root}>
        <NavLink to="./.." className={style.back}>Back</NavLink>
        <h1>{formik.values.name}</h1>
        <div className="divider"></div>

        <FormikProvider value={formik}>
            <Form >
                <h3>Name</h3>
                <Field type="text" name="name" />

                <h3>Hiring Criteria</h3>
                <h3>Responsibilities</h3>
                <Field as="textarea" type="text" name="responsibilities" />

                <h3>Experience</h3>
                <Field as="textarea" type="text" name="experience" />

                <h3>Qualifications</h3>
                <Field as="textarea" type="text" name="qualifications" />

                <div className={style.buttons}>
                    <button type="button" className="second-btn" onClick={cancel}>Cancel</button>
                    <button type="submit">{isEdit ? "Save" : "Create"}</button>
                </div>
            </Form>
        </FormikProvider>

    </div>
}