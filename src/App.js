import logo from './logo.svg';
import { SignIn } from './core/auth/SignIn';
import { SignUp } from './core/auth/SignUp';
import { MainPage } from './core/mainPage/MainPage';
import { BrowserRouter } from 'react-router-dom';
import { RouteCombiner } from './infra/router/RouteCombiner';

import routes from './infra/router/Routes';
import { Toaster } from 'react-hot-toast';
import { AllJobsTable } from './core/dashboard/allJobsTable/AllJobsTable';

function App() {
    return (
    <BrowserRouter>
        <RouteCombiner routes={routes} />
        <div><Toaster
            position="top-right"
            reverseOrder={false}
            /></div>
    </BrowserRouter>
  );
}

export default App;
