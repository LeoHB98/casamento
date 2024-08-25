
import styles from './confirmacao.module.css'
import { ChangeEvent, FormEvent, useState, } from 'react';
import { CloseButton } from './closeButton';

interface ConfirmacaoProps {
    setState: (value: boolean) => void
    setCode: (value: string) => void
    setSendCode: (value: boolean) => void
    currentCode: string
}


export function Confirmacao(props: ConfirmacaoProps) {

    const [localCode, setlocalCode] = useState('')

    function handleSetSendCode(event: FormEvent) {
        event.preventDefault()

        if (localCode && localCode.trim().length > 0) {
            props.setCode(localCode)
            props.setSendCode(true)

        } else {
            // Exibe uma mensagem de erro, se necessário
            // alert('Por favor, preencha o campo com um código válido.');

        }
    }

    function handleSetNewCode(event: ChangeEvent<HTMLInputElement>) {

        const value = event.target.value.trim()

        if (value.length === 0) {
            event.target.setCustomValidity('Valor não pode ser vazio')
            setlocalCode('')
        } else {
            event.target.setCustomValidity('')
            setlocalCode(event.target.value)

        }

    }


    return (


        <div
            className={styles.content}
        >

            <CloseButton
                setBoolean={props.setState}
                setNullString={props.setCode}
            />

            <p>
                Código disponibilizado pelo(a) noivo(a)
            </p>

            <form
                onSubmit={handleSetSendCode}
                className={styles.inputSpace}
            >
                <input
                    name='comment'
                    className={styles.input}
                    onChange={handleSetNewCode}
                    placeholder='Escreva o código aqui...'
                    value={localCode}
                />

                <div className={styles.sendButton}>
                    <button
                        type='submit'
                        title='Enviar codigo'
                    >
                        Enviar
                    </button>
                </div>

            </form>
        </div>


    )

}

