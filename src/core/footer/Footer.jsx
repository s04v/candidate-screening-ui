import style from './style.module.scss';

export function Footer() {
    return <div className={style.footer}>
        <p>©2023 ScreenrAI Ltd. All Rights Reserved.</p>
        <a href="#">Privacy Policy</a>
    </div>
}