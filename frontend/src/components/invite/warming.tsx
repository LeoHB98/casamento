
import { CloseButton } from './closeButton';
import Modal from './modal';
import styles from './warming.module.css'

import { useCallback, useEffect, useState } from "react";

interface WarmingProps {
    setToValueBool1: (value: boolean) => void
    setToValueBool2: (value: boolean) => void
    setShowWarming: (value: string) => void
    warning: string

}

export default function WarmingCode(props: WarmingProps) {

    const [countdown, setCountdown] = useState(1.5);

    function close() {

        props.setToValueBool1(false)
        props.setToValueBool2(false)
        props.setShowWarming('')

    }

    const handleToNextPart =
        useCallback(() => {
            props.setToValueBool1(true);
            props.setToValueBool2(false);
        }, [props]);


    const condition = props.warning === 'ok' || props.warning === 'cadastro'

    useEffect(() => {

        if (condition) {

            const timer = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);

            // Cleanup do timer quando o componente é desmontado
            return () => clearInterval(timer);
        }

    });

    useEffect(() => {

        if (countdown < 0) {
            handleToNextPart();
        }

    }, [countdown, handleToNextPart]);



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
                                onClick={handleToNextPart}
                            >
                                Sim
                            </button>

                        </div>
                    </>

                ) : props.warning === 'cadastro' ? (
                    <>
                        <div>
                            <p>Cadastro confirmado ✅</p>
                        </div>
                    </>
                )
                    :
                    <Modal
                        currentState
                    >
                        <CloseButton
                            setBoolean={props.setToValueBool1}
                        />
                        <div className={styles.lastOne}>
                            <p>Algo aconteceu de errado</p>
                        </div>

                    </Modal>
            }
        </div>
    )
}