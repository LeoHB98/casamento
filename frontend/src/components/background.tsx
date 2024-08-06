
import styles from './background.module.css'
import ButtonConfirm from './button';

// import backimg from "../assets/flores_fundo-removebg-preview.png"
interface PlanoDeFundoProps {
    image: string;
    setConfirmarPresenca: (value: boolean) => void

}

export function PlanoDeFundo(props: PlanoDeFundoProps) {

    return (
        <>
            <div className={styles.container}>

                <div className={styles.header}>
                    <p>
                        Leonardo & Bruna
                    </p>
                    <p>
                        Voce esta convidado
                    </p>
                </div>

                <div className={styles.background_imagem}>
                    <div
                        className={styles.container_imagem}
                        key={props.image}>
                        <img
                            src={props.image}
                        />
                    </div>
                    <ButtonConfirm
                        setState={props.setConfirmarPresenca}
                    />
                </div>
            </div>
        </>

    )

}