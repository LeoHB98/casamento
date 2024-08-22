import styles from './erro.module.css'


interface ErroProps {
    SetError: (value: boolean) => void;
    SetConfirmarPresenca: (value: boolean) => void;
    SetPMembrosFamilia: (value: boolean) => void;
    SetPresencaMembrosConfirmada: (value: boolean) => void;

    SetMessageError: (value: string) => void;
    Message?: string;
}

export function Error(props: ErroProps) {

    function handleSetError() {
        props.SetError(false)
        props.SetConfirmarPresenca(false)
        props.SetPMembrosFamilia(false)
        props.SetPresencaMembrosConfirmada(false)
        props.SetMessageError('')

    }

    return (
        <div className={styles.container}>

            <p>
                {`${props.Message} 😕`}
            </p>

            <button onClick={handleSetError}>
                OK
            </button>
        </div>
    )

}

