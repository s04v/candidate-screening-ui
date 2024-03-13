import { SignIn } from '../../domain/auth/SignIn';
import { SignUp } from '../../domain/auth/SignUp';
import { createBrowserRouter, Outlet } from "react-router-dom";
import { MainPage } from '../../domain/mainPage/MainPage';
import { Dashboard } from '../../domain/dashboard/Dashboard';
import { AddJob } from '../../domain/addJob/AddJob';
import { JobPreview } from '../../domain/jobPreview/JobPreview';
import { CreateCandidate } from '../../domain/createCandidate/CreateCandidate';
import { CandidateScreening } from '../../domain/candidateScreening/CandidateScreening';
import { AddCandidate } from '../../domain/jobPreview/addCandidate/AddCandidate';
import { CandidatePreview } from '../../domain/candidatePreview/CandidatePreview';
import { IntegrationSettings } from '../../domain/integrationSettings/IntegrationSettings';
import { AdminDashboard, ScreeningHistory } from '../../domain/adminDashboard/screeningHistory/ScreeningHistory';
import { RequestPreview } from '../../domain/requestPreview/RequestPreview';


const routes = [
    {
        path: "/signin",
        auth: false,
        exact: true,
        Component: SignIn,
    },
    {
        path: "/signup",
        auth: false,
        exact: true,
        Component: SignUp,
    },
    {
		path: "/*",
		auth: true,
		Component: () => <div></div>,
		Layout: MainPage,
		nested: [ 
            {
				path: "/",
				auth: true,
				exact: true,
				Component: Dashboard,
			},
            {
				path: "newCandidate",
				auth: true,
				exact: true,
				Component: CreateCandidate,
			},
            {
				path: "newJob",
				auth: true,
				exact: true,
				Component: AddJob,
			},
            {
				path: "job/:jobId",
				auth: true,
				exact: true,
				Component: JobPreview,
			},
            {
				path: "job/:jobId/edit",
				auth: true,
				exact: true,
				Component: AddJob,
			},
            {
				path: "job/:jobId/addCandidate",
				auth: true,
				exact: true,
				Component: AddCandidate,
			},
            {
				path: "job/:jobId/candidate/:candidateId/screening",
				auth: true,
				exact: true,
				Component: CandidateScreening,
			},
            {
				path: "job/:jobId/candidate/:candidateId",
				auth: true,
				exact: true,
				Component: CandidateScreening,
			},
            {
				path: "job/:jobId/addCandidate/create",
				auth: true,
				exact: true,
				Component: CreateCandidate,
			},
            {
				path: "candidate/:candidateId",
				auth: true,
				exact: true,
				Component: CandidatePreview,
			},
            {
				path: "candidate/:candidateId/edit",
				auth: true,
				exact: true,
				Component: CreateCandidate,
			},
            {
				path: "settings",
				auth: true,
				exact: true,
				Component: IntegrationSettings,
			},
            {
				path: "admin",
				auth: true,
				exact: true,
				Component: ScreeningHistory,
			},
            {
				path: "admin/request/:requestId",
				auth: true,
				exact: true,
				Component: RequestPreview,
			},
        ]
	},
];

export default routes;