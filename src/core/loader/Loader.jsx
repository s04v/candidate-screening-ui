import style from './style.module.scss';

export const Loader = (props) => {
    return props.isLoad ? <div className={style.blur} >
        <div className={style.loaderContainer}>
            <div className={style.loader}></div>
        </div> 
    </div> : <></>
}