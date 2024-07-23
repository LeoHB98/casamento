import styles from './erro.module.css'


interface ErroProps {
    setError: (value: boolean) => void;
    setConfirmarPresenca: (value: boolean) => void;
    setPMembrosFamilia: (value: boolean) => void;
    setPresencaMembrosConfirmada: (value: boolean) => void;
}

export function Error(props: ErroProps) {

    function handleSetError() {
        props.setError(false)
        props.setConfirmarPresenca(false)
        props.setPMembrosFamilia(false)
        props.setPresencaMembrosConfirmada(false)
    }

    return (
        <div className={styles.container}>
            <p>
                Algo aconteceu de errado
                😕
            </p>

            <button onClick={handleSetError}>
                OK
            </button>
        </div>
    )

}

