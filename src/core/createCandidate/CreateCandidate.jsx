import {NavLink } from 'react-router-dom';
import style from './style.module.scss';
import { Field, Form, FormikProvider } from 'formik';
import { useCreateCandidate } from './useCreateCandidate';
import { FileViewer } from 'react-file-viewer';
import { Document, Page } from 'react-pdf';
import { useEffect } from 'react';

import { backend } from '../../infra/backend';
import { Loader } from '../loader/Loader';

export function CreateCandidate() {
    const { 
        formik, 
        isEdit, 
        cancel, 
        uploadResume, 
        resumeSelectHandler ,
        resumeFile,
        isLoad,
    } = useCreateCandidate();

    return <div className={style.root}>
        <Loader isLoad={isLoad}/>
        <NavLink to="./.." className={style.back}>Back</NavLink>
        <h1>{formik.values.name}</h1>
        <div className="divider"></div>
        <h3>Candidate Profile</h3>

        <FormikProvider value={formik}>
            <Form>
                <div className={style.fields}>
                    <div>
                        <h3>First Name</h3>
                        <Field type="text" name="firstName" />
                        <h3>Last Name</h3>
                        <Field type="text" name="lastName" />
                        <h3>Email</h3>
                        <Field type="text" name="email" />
                    </div>
                    <div>
                        <h3>Files</h3>
                         { !resumeFile ? <div className={style.emptyFileInput} onClick={uploadResume}>
                           <h4>Upload Resume</h4>
                        </div> : "" }

                        { resumeFile && resumeFile.type === "application/pdf" ?
                        <div className={style.fileInput} onClick={uploadResume}>
                            <canvas  id="pdfCanvas" className={style.pdfCanvas}></canvas>
                        </div>
                        : ""}
                        { resumeFile && resumeFile.type !== "application/pdf" ?
                        <div className={style.fileInput} onClick={uploadResume}>
                            <div id="docxPreview" className={style.docxPreview}></div>
                            <img id="docxPreviewImage" />
                        </div> : ""}
                        <input id="selectResume" hidden type="file" onChange={resumeSelectHandler} />
                    </div>
                </div>
                <h3>Resume</h3>
                <Field as="textarea" type="text" name="resume" />
                <div className={style.buttons}>
                    <button className="second-btn" onClick={cancel}>Cancel</button>
                    <button type="submit">{isEdit ? "Save" : "Create"}</button>
                </div>
            </Form>
        </FormikProvider>
    </div>
}