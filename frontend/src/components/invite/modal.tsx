import styles from './modal.module.css'
import React from 'react'


interface ModalProps {
    currentState: boolean,
    children?: React.ReactNode
}


export default function Modal(props: ModalProps) {

    if (props.currentState) {
        return (
            <div className={styles.container}>
                <div className={styles.modal}>
                    {props.children}
                </div>
            </div>
        )
    }

    return null

}
