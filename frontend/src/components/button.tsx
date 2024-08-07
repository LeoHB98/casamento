
import styles from './button.module.css'

interface ButtonProps {
    setState: (value: boolean) => void
}

export default function ButtonConfirm(props: ButtonProps) {

    function SetState() {
        props.setState(true)
    }

    return (
        <div
            className={styles.container}
        >
            <button
                onClick={SetState}
            >
                Confirme aqui a sua presença
            </button>
        </div>
    )

}