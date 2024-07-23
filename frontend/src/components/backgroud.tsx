
import styles from './background.module.css'

// import backimg from "../assets/flores_fundo-removebg-preview.png"
interface PlanoDeFundoProps {
    images: string;
}

export function PlanoDeFundo({ images }: PlanoDeFundoProps) {

    return (
        <>
            <div className={styles.color}></div>

            <div className={styles.backgroud}>

                {/* {images.map((image, index) => (      ))} */}

                <div
                    className={styles.imagem}
                    key={images}>
                    <img
                        src={images}
                    // alt={`slide-${index}`}
                    />

                </div>

                {/* <img
                    src={backimg}
                /> */}

            </div>
        </>

    )

}