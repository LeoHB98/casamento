import styles from './gifts_storage.module.css'

export default function AllGifts() {

    return (

        <div className={styles.container}>

            <div className={styles.list}>

                <div className={styles.item}>Componente 1</div>
                <div className={styles.item}>Componente 2</div>
                <div className={styles.item}>Componente 3</div>
                <div className={styles.item}>Componente 4</div>
                <div className={styles.item}>Componente 5</div>
                <div className={styles.item}>Componente 6</div>
                {/* Adicione mais componentes conforme necessário */}
            </div>
        </div>


    )

}