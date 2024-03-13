import Cookies from 'universal-cookie';
import style from './style.module.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { useHeader } from './useHeader';
import { Loader } from '../loader/Loader';

export function Header() {
    const { logout, user, purchaseCredits, isLoad } = useHeader();

    if (!user)
        return;
    
    console.log(user);

    return <div className={style.header}>
        <Loader isLoad={isLoad}></Loader>
        <NavLink to="/">  
            <img src="/img/logo2.svg" />
        </NavLink>

        <div className={style.menu}>
            <p>{user.credits} credits</p>
            <p onClick={() => window.open("https://billing.stripe.com/p/login/test_14kaGgaeRdGA9d67ss")} >{user.subscription.type} <img src="/img/plan-icon.svg" /></p>
            <p onClick={purchaseCredits}>Purchase 100 credits</p>
            <NavLink to="/settings"> 
                <p><img src="/img/settings-icon.svg" /></p>
            </NavLink>
            {user.isAdmin ? 
                <NavLink to="/admin"> 
                    <p><img src="/img/dashboard-icon.svg" /></p>
                </NavLink>
            : ""}
        </div>
        <button onClick={logout}>Log Out</button>

    </div>
}
