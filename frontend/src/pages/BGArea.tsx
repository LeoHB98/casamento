import { useNavigate } from "react-router-dom";

import styles from './BGArea.module.css'
import { Header } from "../models/gifts/header";
export default function BGArea() {

    const navigate = useNavigate();

    const goTo = (value: string) => {
        navigate(`/${value}`)
    }

    return (
        <div className={styles.container}>
            <Header

                middle="Area dos noivos"
                toPage=""
            />

            <button onClick={() => goTo('gifts')}>
                Presentes
            </button>

            <button
                onClick={() => goTo('guests')}
            >
                Convidados
            </button>


        </div>
    )
}