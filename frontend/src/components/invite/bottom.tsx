import { useNavigate } from "react-router-dom";
import styles from './bottom.module.css'

export function Bottom() {

    const navigate = useNavigate();

    const goTo = (value: string) => {
        navigate(`/${value}`)
    }


    return (
        <div className={styles.container}>
            <button onClick={() => goTo('login')}>
                Àrea Noivos
            </button>
        </div>

    )
}