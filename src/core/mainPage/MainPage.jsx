import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';
import style from './style.module.scss';

export function MainPage(props) {
    return <div className={style.main}>
        <Header></Header>
        <div class={style.content}>
            {props.children}
        </div>
        <Footer></Footer>
    </div>
}