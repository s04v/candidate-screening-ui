import { useState } from "react";
import style from './style.module.scss';

const data = [
    "gpt3",
    "gpt4",
    "gpt5",
];

export function DrowdownMenu(props) {
    const [menuIsOpened, setMenuIsOpened] = useState(false);

    const [selectedOption, setSelectedOption] = useState(props.active);

    const outsideMenuClick = () => {
        setMenuIsOpened(false);
        document.removeEventListener("click", outsideMenuClick, false);
    }
    
    const openMenu = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setMenuIsOpened(true);
        document.addEventListener("click", outsideMenuClick, false);
    }

    const onSelect = (item) => {
        props.onSelect(item);
        setSelectedOption(item)
    }
    return <div>
        <p onClick={openMenu} className={style.dropdownInput}>
                {selectedOption}
                <img src="/img/dropdown-arrow-icon.svg"/>
            </p>
            <div class={`${style.dropdownMenu} ${menuIsOpened ? style.openMenu : ''} `}>
                {props.data.length && props.data.map(item => 
                    <p onClick={() => onSelect(item)}>{item}</p>
                )}
            </div>
    </div>
}