import { ArrowLeft, Plus } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import styles from './header.module.css'

interface HeaderProps {
    toPage: string;
    middle: string;
    SetOpenWindow?: (value: boolean) => void;
    hasAdd: boolean;
}

export function Header(props: HeaderProps) {

    const navigate = useNavigate();

    const goTo = (value: string) => {
        navigate(`/${value}`)
    }

    function handleAdd() {
        if (props.SetOpenWindow) {
            props.SetOpenWindow(true)
        }
    }

    return (
        <div className={styles.container}>
            <button
                onClick={() => goTo(`${props.toPage}`)}
            >
                <ArrowLeft
                    size={30}
                />
            </button>

            <p>{props.middle}</p>


            {props.hasAdd ?

                <button
                    onClick={handleAdd}
                >
                    <Plus
                        size={30}
                    />
                </button>

                : <div className={styles.noadd}></div>}



        </div>

    )


}