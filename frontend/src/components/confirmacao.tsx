
import styles from './confirmacao.module.css'
import { X } from 'phosphor-react'
import { ChangeEvent, FormEvent, } from 'react';

interface ConfirmacaoProps {
    setState: (value: boolean) => void
    setCode: (value: string) => void
    setSendCode: (value: boolean) => void
    currentCode: string
}


export function Confirmacao(props: ConfirmacaoProps) {

    function handleSetSendCode(event: FormEvent) {
        event.preventDefault()
        props.setSendCode(true)
    }

    function handleSetNewCode(event: ChangeEvent<HTMLInputElement>) {


        if (event.target.value.length === 0) {
            event.target.setCustomValidity('Valor nao pode ser vazio')
        } else {
            event.target.setCustomValidity('')
        }

        props.setCode(event.target.value)
    }


    return (
        <>

            <div className={styles.closeButton}>
                <button
                    onClick={() => props.setState(false)}
                >
                    <X
                        size={20}
                        color='white'
                    />
                </button>
            </div>

            <div
                className={styles.content}
            >
                <p>
                    Codigo disponibilizado pelo(a) noivo(a)
                </p>

                <form
                    onSubmit={handleSetSendCode}
                    className={styles.inputSpace}
                >
                    <input
                        name='comment'
                        className={styles.input}
                        onChange={handleSetNewCode}
                        placeholder='Escreva o codigo aqui...'
                        value={props.currentCode}
                    />

                    <button
                        type='submit'
                        className={styles.sendButton}
                        title='Enviar codigo'
                    >
                        Enviar
                    </button>
                </form>
            </div>

        </>
    )

}

