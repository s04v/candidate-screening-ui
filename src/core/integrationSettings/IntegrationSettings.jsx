
import { Field, Form } from 'formik';
import { Loader } from '../loader/Loader';
import style from './style.module.scss';
import { useIntegrationSettings } from './useIntegrationSettings';
import { NavLink } from 'react-router-dom';
import { DrowdownMenu } from '../../ui/dropdownMenu';

export function IntegrationSettings() {
    const {
        greenHousAuth,
        user,
        openEditToken,
        saveToken,
        editToken,
        token,
        setToken,
        disconnect,
        updateAutoScreening,
        autoScreening,
        deleteAccount,
        updateModel,
        temperature,
        onTemperatureChange
    } = useIntegrationSettings();

    if (!user)
        return <Loader isLoad={true}></Loader>


    return <div className={style.root}>
        <NavLink to="./.." className={style.back}>Back</NavLink>
        <h1>Integration Settings</h1>
        <div className="divider"></div>
        <h3>Integrations</h3>
        <div className={style.box}>
            <div className={style.greenHouseAuth}>
                <p>Greenhouse</p>
                {user.greenHouseUserId ? <button onClick={disconnect}>Disconnect</button> 
                : <button onClick={greenHousAuth} className={user.subscription.type != "Business" ? style.disableButton : ""}>Login with Greenhouse</button> }
                
            </div>
            { user.subscription.type !== "Business" ?
                <p className={style.upgradePlan}>Upgrade your plan to Business in Settings.</p>
                : "" }
            {user.greenHouseUserId ?
            <>
                <h4>Webhooks URL</h4>
                <p>https://mxkcp2drs5.eu-central-1.awsapprunner.com/greenhouse/callback/{user._id}</p>
                <div className={style.tokenBox}>
                    <h4>Harvest API key</h4>
                    {openEditToken 
                    ? 
                    <div>
                        <input className={style.tokenInput} type="text" value={token} onChange={(e) => setToken(e.target.value)} />
                        <p onClick={saveToken} className={style.save}>Save</p>
                    </div>
                    :
                    <div>
                        <p>{ token ? "************************" : "(empty)"}</p>
                        <img onClick={editToken} src="/img/edit-icon.svg" />
                    </div>
                    }
                </div>
            </>
            : ""}
        </div>

        <h3>Settings</h3>
        <div className={`${style.box} ${style.greenHouseAuth}`}>
            <p>Auto-screen candidate on creation <span>(consumes credits automatically)</span></p>
            <label class="switch" onClick={updateAutoScreening}>
                <input type="checkbox" checked={autoScreening} />
                <span class="slider round"></span>
            </label>
        </div>

        {user.isAdmin ? <>
            <br />
            <br />
            <div className={`${style.box} ${style.greenHouseAuth}`}>
                <p>Model</p>
                <DrowdownMenu 
                    data={["gpt-4-1106-preview", "gpt-4", "gpt-3.5-turbo-1106"]} 
                    active={user.gptModel}
                    onSelect={updateModel}></DrowdownMenu>
            </div>
        </> : ""}
        

        {user.isAdmin ? <>
            <br />
            <br />
            <div className={`${style.box} ${style.greenHouseAuth}`}>
                <p>Temperature</p>
                <input type="number" value={temperature} onChange={(e) => onTemperatureChange(e.target.value)} />
            </div>
        </> : ""}

        <br />
        <br />
        <div className={`${style.box} ${style.greenHouseAuth}`}>
            <p>Delete account (permanently)</p>
            <button className="red-btn" onClick={deleteAccount}>Delete Account</button>
        </div>
    </div>
}

