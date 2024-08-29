import styles from './info.module.css'
import Flower from '../../assets/png-clipart-purple-and-white-flowers-flower-bouquet-violet-violet-purple-leaf.png'
// import Flower2 from '../../assets/violet_2.png'

export default function Info() {
    return (

        <div className={styles.container}>

            <div className={styles.imge}>
                <img src={Flower} alt="" />
            </div>
            <div className={styles.text}>
                <h1>24 de Janeiro de 2025</h1>
                <h4>às</h4>
                <h3>18:30</h3>
                <h3>Sexta-feira</h3>
            </div>
        </div>
    )
}

