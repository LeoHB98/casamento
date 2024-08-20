
import { useCallback, useEffect, useState } from 'react'
import { Api } from './../api/api';
import { ResponseGetMembers } from './../models/modal.interface'
import { Confirmacao } from './../components/confirmacao'
import { Membros } from './../components/membro';
import { PlanoDeFundo } from './../components/background';
// import { Images } from './../assets/imgs';
import { BackgroudImage } from './../assets/backgroud'
// import { Carrossel } from './../components/carrossel'


import Modal from './../components/modal'
import { Error } from './../components/erro';
import MembrosEnviados from './../components/envio_membros';


// import EmojiPicker from 'emoji-picker-react';
import ButtonConfirm from './../components/confirmation_button';
import Header from './../components/header';
import Location from '../components/location';

// import Party from './../assets/1f389.png'

export default function Invite() {

    //Modais
    const [confirmarPresenca, setConfirmarPresenca] = useState(false)
    const [pMembrosFamilia, setPMembrosFamilia] = useState(false)
    const [modalError, setModalError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [presencaMembrosConfirmada, setPresencaMembrosConfirmada] = useState(false)

    const [family, setFamily] = useState<Partial<ResponseGetMembers>>({});

    const [code, setCode] = useState('')
    const [sendCode, setSendCode] = useState(false)

    const [membersSelected, setMembersSelected] = useState<string[]>([])



    function handleToFamilyMembers() {
        setConfirmarPresenca(false)
        setPMembrosFamilia(true)
    }


    const fetchFamilyData = useCallback(async () => {


        const data = await Api.getAFamily(code)

            .catch(function (error) {
                setModalError(true)

                if (error.http_code == 404) {
                    alert(error)
                    setErrorMessage("Código inválido. Verifique e envie novamente")
                    setFamily({})
                    console.log(error);
                }

                // if (error.response) {
                //     // A requisição foi feita e o servidor respondeu com um código de status
                //     // que sai do alcance de 2xx
                //     console.error(error.response.data);
                //     console.error(error.response.status);
                //     console.error(error.response.headers);
                // } else if (error.request) {
                //     // A requisição foi feita mas nenhuma resposta foi recebida
                //     // `error.request` é uma instância do XMLHttpRequest no navegador e uma instância de
                //     // http.ClientRequest no node.js
                //     console.error(error.request);
                // } else {

                //     // Alguma coisa acontenceu ao configurar a requisição que acionou este erro.
                //     console.error('Error', error.message);
                // }
                // console.error(error.config);
            })
            .finally(function () {
                setLoading(false);
                setCode('')
                setSendCode(false)
                setConfirmarPresenca(false)

            });

        console.log(data)
        if (data !== undefined) {
            setFamily(data)
        }


    }, [code]);

    const confirmMembers = useCallback(async () => {

        try {
            setLoading(true)
            if (membersSelected.length > 0) {
                const data = await Api.confirmationMembers(membersSelected);
                console.log(data);
            }

        } catch (err) {
            console.log(err);
            setModalError(true);

        } finally {
            setLoading(false)
            setPresencaMembrosConfirmada(true)
        }
    }, [membersSelected])



    useEffect(() => {

        if (sendCode && (code.length > 0)) {
            fetchFamilyData()
        }

    }, [sendCode, code, fetchFamilyData]);


    useEffect(() => {
        if (membersSelected.length > 0) {
            confirmMembers();
        }
    }, [membersSelected, confirmMembers]);

    return (


        <div>

            <Header />
            <PlanoDeFundo
                image={BackgroudImage}
            />

            <ButtonConfirm
                setState={setConfirmarPresenca}
            />

            {/* <Carrossel
        images={Images}
      /> */}

            <Location />

            <Modal
                currentState={confirmarPresenca}
            >
                <Confirmacao
                    setState={setConfirmarPresenca}
                    setCode={setCode}
                    setSendCode={setSendCode}
                    currentCode={code}
                />
            </Modal>

            {
                modalError ?
                    <>
                        <Modal
                            currentState
                        >
                            <Error
                                setError={setModalError}
                                setConfirmarPresenca={setConfirmarPresenca}
                                setPMembrosFamilia={setPMembrosFamilia}
                                setPresencaMembrosConfirmada={setPresencaMembrosConfirmada}
                                message={errorMessage}
                                setMessageError={setErrorMessage}
                            />
                        </Modal>
                    </> : <></>
            }

            {!sendCode && family.id !== undefined ?
                <Modal
                    currentState={!sendCode}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: '100%',
                        flexDirection: 'column',
                    }}>
                        <h3 style={{
                            marginBottom: '20px'
                        }}>
                            Código confirmado! ✅
                        </h3>
                        <button onClick={handleToFamilyMembers}>
                            Clique para continuar
                        </button>
                    </div>
                </Modal>
                : <></>
            }

            {pMembrosFamilia ?
                <Modal
                    currentState={pMembrosFamilia}>
                    <Membros
                        family={family}
                        setMembers={setFamily}
                        setOpenMembersModal={setPMembrosFamilia}
                        setMembersSelected={setMembersSelected}
                    />
                </Modal>
                : <></>
            }

            {loading ?
                <Modal
                    currentState={loading}
                >
                    <p>Aguarde...</p>
                </Modal>
                : <></>}

            {presencaMembrosConfirmada && !modalError ?
                <Modal
                    currentState={presencaMembrosConfirmada}
                >
                    <MembrosEnviados
                        setMembrosEnviados={setPresencaMembrosConfirmada}
                        setMembersSelected={setMembersSelected}
                    />
                </Modal>
                : <></>
            }


        </div>



    )
}


