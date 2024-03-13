import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { backend } from "../../infra/backend";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useState } from "react";
import { renderAsync } from "docx-preview";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import * as pdfjsWorker from "pdfjs-dist/build/pdf.worker";
import * as htmlToImage from 'html-to-image';
import { useRef } from "react";
import { useLayoutEffect } from "react";
import style from './style.module.scss';

export const useCreateCandidate = () => {
    const navigate = useNavigate();
    const isEdit = window.location.pathname.endsWith('edit');
    const { jobId, candidateId } = useParams();
    const [resumeFile, setResumeFile] = useState(null);
    const [isLoad, setIsLoad] = useState(false);
    const pdfCanvasRef = useRef(null);

    const [isRendered, setIsRendered] = useState(false);
    
    const initForm = {
        name: "",
        firstName: "",
        lastName: "",
        email: "",
        resume: "",
    };

    const formik = useFormik({
		// validateOnChange: false,
		enableReinitialize: true,
		initialValues: initForm,
		onSubmit: async (values) => {
            const formData = new FormData();

            for ( var key in values ) {
                formData.append(key, values[key]);
            }

            formData.append("file", resumeFile);

            if (isEdit) {
                await backend.putForm(`/candidate/${candidateId}`, formData);
                toast.success("Candidate updated");
            }
            else if (jobId) {
                await backend.postForm(`/job/${jobId}/candidate`, formData);
                toast.success("Candidate created");
            }
            else {
                await backend.postForm(`/candidate`, formData);
                toast.success("Candidate created");
            }

            navigate("./..");
		},
	});

    useLayoutEffect(() => {
        if (isEdit) {
            backend
                .get(`/candidate/${candidateId}`)
                .then(res => {
                    const candidateValue = {
                        firstName: res.firstName,
                        lastName: res.lastName,
                        email: res.email,
                        resume: res.resume,
                    };
                    
                    formik.setValues(candidateValue);
                });

        }
        setIsRendered(true);
    }, []);

    useEffect(()=> {
        backend
        .get(`/candidate/${candidateId}/resume`)
        .then(res => {
            if(res) {
                setIsLoad(true);
                setResumeFile(res);
                makeResumePreview(res);
            }
        })
    },[isRendered]);

    const cancel = (e) => {
        e.preventDefault();
        e.stopPropagation();

        navigate(-1);
    }

    const uploadResume = (e) => {
        document.getElementById("selectResume").click();
    }

    const renderPdf = async (buffer) => {
        const pdfDoc = await pdfjsLib.getDocument({ data: buffer }).promise;
  
        const pageNum = 1; // or any other page number
        const page = await pdfDoc.getPage(pageNum);
  
        const canvas = document.getElementById("pdfCanvas");
        if(canvas) {
            const context = canvas.getContext('2d');
            
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.beginPath();

            const viewport = page.getViewport({ scale: 0.4 }); // Adjust scale as needed
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const renderContext = {
            canvasContext: context,
            viewport: viewport,
            };

            await page.render(renderContext);
        }
      };

    const renderDocx = async (buffer) => {
        const docxPreview = document.getElementById("docxPreview");
        const docxPreviewImage = document.getElementById("docxPreviewImage");

        const res = await renderAsync(buffer, docxPreview);
        
        docxPreviewImage.src = await htmlToImage.toPng(docxPreview);
        docxPreview.innerHTML = "";
    }

    const resumeSelectHandler = (e) => {
        setIsLoad(true);

        const file = e.target.files[0]
        setResumeFile(file)
        console.log(file);
        makeNewResumePreview(file);
    } 

    const makeNewResumePreview = (file) => {
        var reader = new FileReader();

        reader.addEventListener('load', async (e) => {
            console.log('LOAD');
            if (file.type === "application/pdf") {
                await renderPdf(e.target.result);
            } else {
                await renderDocx(e.target.result);
            }
            setIsLoad(false);
        });

        reader.readAsArrayBuffer(file);
    }
    
    const makeResumePreview = async (file) => {
        if (file.type === "application/pdf") {
            await renderPdf(file.data.data);
        } else {
            await renderDocx(file.data.data);
        }

        setIsLoad(false);
    }

    return {
        formik,
        isEdit,
        cancel,
        uploadResume,
        resumeSelectHandler,
        resumeFile,
        isLoad,
        pdfCanvasRef,
    };
}