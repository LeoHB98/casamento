
import styles from './background.module.css'


// import backimg from "../assets/flores_fundo-removebg-preview.png"
interface PlanoDeFundoProps {
    image: string;
}

export function PlanoDeFundo({ image }: PlanoDeFundoProps) {

    return (
        <div className={styles.container}>

            <div className={styles.container_header}>
                <p>
                    Você está convidado!
                </p>
                <p>
                    Leonardo & Bruna
                </p>
            </div>

            <div
                className={styles.container_imagem}
                key={image}>
                <img
                    src={image}
                />
            </div>

        </div>


    )

}