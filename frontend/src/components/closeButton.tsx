import { X } from 'phosphor-react'
import styles from './closeButton.module.css'


interface CloseButtonProps {
    setObjetct?: (value: object) => void
    setStringArray?: (value: string[]) => void
    setBoolean?: (value: boolean) => void
}

export function CloseButton(props: CloseButtonProps) {

    function close() {

        if (props.setBoolean !== undefined) {
            props.setBoolean(false)
        }

        if (props.setObjetct !== undefined) {
            props.setObjetct({})
        }

        if (props.setStringArray !== undefined) {
            props.setStringArray([])
        }
    }

    return (
        <div className={styles.close}>
            <button onClick={close}>
                <X
                    size={20}
                    color='black'
                />
            </button>
        </div>
    )

}