import styles from './warming.module.css'

import { useCallback, useEffect, useState } from "react";

interface WarmingProps {
    setToFamilyMembers: (value: boolean) => void
    setConfirmPresence: (value: boolean) => void
    setShowWarming: (value: string) => void
    warning: string

}

export default function WarmingCode(props: WarmingProps) {

    const [countdown, setCountdown] = useState(1.5);

    function close() {

        props.setToFamilyMembers(false)
        props.setConfirmPresence(false)
        props.setShowWarming('')

    }

    const handleToFamilyMembers =
        useCallback(() => {
            props.setToFamilyMembers(true);
            props.setConfirmPresence(false);
        }, [props]);


    useEffect(() => {

        if (props.warning === 'ok') {

            const timer = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);

            // Cleanup do timer quando o componente é desmontado
            return () => clearInterval(timer);
        }

    });

    useEffect(() => {

        if (countdown < 0) {
            handleToFamilyMembers();
        }

    }, [countdown, handleToFamilyMembers]);



    return (

        <div className={styles.container}>

            {props.warning === 'ok'
                ? (
                    <>
                        <h3>
                            Código confirmado! ✅
                        </h3>
                        {/* <button onClick={handleToFamilyMembers}>
                            Clique para continuar
                        </button> */}
                    </>

                ) : props.warning === 'warning' ? (
                    <>
                        <p>
                            Voce já confirmou a presença.
                        </p>
                        <p>
                            Deseja editar?
                        </p>

                        <div className={styles.options}>

                            <button
                                onClick={close}
                            >
                                Não
                            </button>

                            <button
                                onClick={handleToFamilyMembers}
                            >
                                Sim
                            </button>

                        </div>
                    </>

                ) : <></>
            }
        </div>
    )
}