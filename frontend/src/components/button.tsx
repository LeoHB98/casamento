import styles from './button.module.css'

interface ButtonProps {
    setState: (value: boolean) => void
}

export default function ButtonConfirm(props: ButtonProps) {


    return (
        <div
            className={styles.container}
        >
            <button onClick={() => {
                props.setState(true)
            }}>
                Confirme aqui a sua presença
            </button>
        </div>
    )

}