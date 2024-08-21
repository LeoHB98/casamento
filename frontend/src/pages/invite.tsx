
import { useCallback, useEffect, useState } from 'react'
import { Api } from './../api/api';
import { RequestMembersSelected, ResponseGetMembers } from './../models/modal.interface'
import { Confirmacao } from '../components/invite/confirmacao'
import { Membros } from '../components/invite/membro';
import { PlanoDeFundo } from '../components/invite/background';
// import { Images } from './../assets/imgs';
import { BackgroudImage } from './../assets/backgroud'
// import { Carrossel } from './../components/carrossel'


import Modal from '../components/invite/modal'
import { Error } from '../components/invite/erro';
import MembrosEnviados from '../components/invite/envio_membros';


// import EmojiPicker from 'emoji-picker-react';
import ButtonConfirm from '../components/invite/confirmation_button';
import Header from '../components/invite/header';
import Location from '../components/invite/location';


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

            .catch(function (err) {
                setModalError(true)

                if (err.response.status == 404) {
                    // alert(err)
                    setErrorMessage("Código inválido. Verifique e envie novamente")
                    setFamily({})
                    setCode('')
                    console.log(err);
                }
            })
            .finally(function () {
                setLoading(false);
                setSendCode(false)
                setConfirmarPresenca(false)

            });

        console.log(data)
        if (data !== undefined) {
            setFamily(data)
        }


    }, [code]);

    const confirmMembers = useCallback(async () => {

        if (membersSelected.length > 0) {

            setLoading(true)
            const m: RequestMembersSelected = {
                code: code,
                members: membersSelected
            }

            console.log(m);

            const data = await Api.postConfirmationMembers(m)
                .catch(function (err) {
                    console.log(err)
                    setErrorMessage("Algo deu errado")
                    setModalError(true)

                    // if (err.response.status == 400) {
                    // }

                    // if (err.code == AxiosError.ERR_BAD_REQUEST) {
                    //     setErrorMessage("Something wrong")
                    //     setModalError(true)
                    // }

                }).finally(function () {
                    setCode('')
                    setPresencaMembrosConfirmada(true)
                    setLoading(false)
                    setMembersSelected([])
                })

            console.log(data);

        }

    }, [membersSelected, code])



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


