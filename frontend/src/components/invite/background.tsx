
import styles from './background.module.css'

import BkgImage from '../../assets/foto (154).jpg'

export function PlanoDeFundo() {

    return (
        <div className={styles.container}>

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