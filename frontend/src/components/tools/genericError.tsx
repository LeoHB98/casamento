import { CloseButton } from "../invite/closeButton"
import Modal from "../invite/modal"
import styles from './genericError.module.css'

interface ErrorProps {
    SetCloseWindow: (value: boolean) => void
    closeWindow: boolean
    ErrorMessage: string
}

export function GenericError(props: ErrorProps) {

    return (
        <Modal
            currentState={props.closeWindow}
        >
            <div className={styles.container}>

                <header>
                    <CloseButton
                        setBoolean={props.SetCloseWindow}
                    />
                </header>

                <div className={styles.content}>
                    <p>{`${props.ErrorMessage} 😕`}</p>
                </div>



            </div>
        </Modal>


    )

}