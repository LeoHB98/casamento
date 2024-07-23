import styles from './header.module.css'

export function Header() {
    return (
        <div
            className={styles.container}
        >
            <p>
                Leonardo & Bruna
            </p>

            <p style={{ fontSize: '100px' }}>
                Voce esta convidado!!!
            </p>

        </div>
    )
}