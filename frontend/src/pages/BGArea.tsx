import { useNavigate } from "react-router-dom";

import styles from './BGArea.module.css'
import { Header } from "../models/header";

export default function BGArea() {

    const navigate = useNavigate();

    const goTo = (value: string) => {
        navigate(`/${value}`)
    }

    return (

        <>
            <Header
                middle="Àrea dos noivos"
                toPage=""
                hasAdd={false}
            />

            <div className={styles.box}>

                <div className={styles.container}>
                    <button onClick={() => goTo('gifts')}>
                        Presentes
                    </button>

                    <button
                        onClick={() => goTo('guests')}
                    >
                        Convidados
                    </button>
                </div>

            </div>
        </>

    )
}