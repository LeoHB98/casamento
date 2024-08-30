
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react'
import styles from './login.module.css'
import { Header } from '../models/gifts/header'
import { Api } from '../api/api'
import { GenericError } from '../components/tools/genericError'


export default function Login() {

    const [pass, setPass] = useState('')
    const [username, setUsername] = useState('')

    const [send, setSend] = useState(false)

    const [hasError, setHasError] = useState(false)

    function onChangeUsername(event: ChangeEvent<HTMLInputElement>) {

        const u = event.target.value
        setUsername(u)


    }

    function onChangePassword(event: ChangeEvent<HTMLInputElement>) {

        const p = event.target.value.trim()

        if (p && p !== '') {
            setPass(p)
        }

    }



    const fecthGetLogin = useCallback(

        async () => {
            if (send) {
                const response = Api.login(username, pass)
                    .catch((err) => {
                        console.log(err)
                        setHasError(true)

                    })

                console.log(response)
            }


            setSend(false)
        }, [username, pass, send]);



    useEffect(() => {
        console.log(username)
        console.log(pass)
        fecthGetLogin()
    }, [username, pass, fecthGetLogin])


    function handleSendLogin(event: FormEvent) {
        event.preventDefault()
        setSend(true)
    }

    return (

        <>

            <div className={styles.box}>

                <Header
                    middle=''
                    toPage=''
                    hasAdd={false}
                />

                <form action=""
                    className={styles.container}
                    onSubmit={handleSendLogin}
                >

                    <div>
                        <label htmlFor="username">Usuário</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder='Digite o nome de usuário'
                            value={username}
                            onChange={onChangeUsername}

                        />
                    </div>

                    <div>
                        <label htmlFor="password">Senha</label>

                        <input type="password"
                            id='password'
                            placeholder='Digite a senha'
                            name='password'
                            value={pass}
                            onChange={onChangePassword}
                        />
                    </div>
                    <button
                        type='submit'
                    >
                        Entrar
                    </button>

                </form>
                {hasError ?
                    <GenericError
                        ErrorMessage='Não foi possível efetuar o login'
                        SetCloseWindow={setHasError}
                        closeWindow={hasError}
                    /> : <></>}

            </div>
        </>
    )
}