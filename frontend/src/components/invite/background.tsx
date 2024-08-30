
import styles from './background.module.css'

import BkgImage from '../../assets/we_3.jpg'

export function PlanoDeFundo() {

    return (
        <div className={styles.container}>

            <header>
                <h1>Leonardo</h1>
                <h2>&</h2>
                <h1>Bruna</h1>
            </header>

            <div
                className={styles.imge}
                key={BkgImage}>
                <img
                    src={BkgImage}
                />
            </div>

        </div>


    )

}