import styles from './erro.module.css'


interface ErroProps {
    setError: (value: boolean) => void;
    setConfirmarPresenca: (value: boolean) => void;
    setPMembrosFamilia: (value: boolean) => void;
    setPresencaMembrosConfirmada: (value: boolean) => void;

    setMessageError: (value: string) => void;
    message?: string;
}

export function Error(props: ErroProps) {

    function handleSetError() {
        props.setError(false)
        props.setConfirmarPresenca(false)
        props.setPMembrosFamilia(false)
        props.setPresencaMembrosConfirmada(false)
        props.setMessageError('')

    }

    return (
        <div className={styles.container}>

            <p>
                {`${props.message} 😕`}
            </p>

            <button onClick={handleSetError}>
                OK
            </button>
        </div>
    )

}

