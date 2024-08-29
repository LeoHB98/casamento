
import styles from './background.module.css'

import BkgImage from '../../assets/we_3.jpg'

export function PlanoDeFundo() {

    return (
        <div className={styles.container}>

            <div className={styles.container_header}>
                {/* <p>
                    Você está convidado!
                </p> */}
                <h1>Leonardo</h1>
                <h2>&</h2>
                <h1>Bruna</h1>
            </div>

            <div
                className={styles.container_imagem}
                key={BkgImage}>
                <img
                    src={BkgImage}
                />
            </div>

        </div>


    )

}