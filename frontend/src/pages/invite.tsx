
import { useCallback, useEffect, useState } from 'react'
import { Api } from './../api/api';
import { RequestMembersSelected, MembersData } from '../models/invite/modal.interface'
import { Confirmacao } from '../components/invite/confirmacao'
import { Membros } from '../components/invite/membro';
import { PlanoDeFundo } from '../components/invite/background';
import { BackgroudImage } from './../assets/backgroud'
import { Error } from '../components/invite/erro';

import Modal from '../components/invite/modal'
import MembrosEnviados from '../components/invite/envio_membros';
import ButtonConfirm from '../components/invite/confirmation_button';
import Header from '../components/invite/header';
import Location from '../components/invite/location';
import WarmingCode from '../components/invite/warming';

// import EmojiPicker from 'emoji-picker-react';
// import Party from './../assets/1f389.png'

export default function Invite() {

    //Modais

    //Controla se abre ou nao o modal para digitar o codigo
    const [confirmPresence, setConfirmPresence] = useState(false)

    //Controla o codigo do convidado
    const [code, setCode] = useState('')

    //Constrola se o codigo deve ser enviado  para o backend ou nao
    const [sendCode, setSendCode] = useState(false)

    //Modal que mostra os avisos apos o envio do codigo
    const [showWarning, setShowWarning] = useState('')

    //Modal que mostra os membros segundo o codigo enviado
    const [showMembers, setShowMembers] = useState(false)

    //Abriga os convidados
    const [guests, setGuests] = useState<Partial<MembersData>>({});

    //Abriga os convidados que foram selecionados pelo usuario
    const [membersSelected, setMembersSelected] = useState<string[]>([])

    //Modal que controla os erros
    const [modalError, setModalError] = useState(false)

    //Modal que controla a mensagem de erro
    const [errorMessage, setErrorMessage] = useState('')

    //Modal que controla se aparece o loading
    const [loading, setLoading] = useState(false)

    //Modal que controla se os membros foram confirmados
    const [presencaMembrosConfirmada, setPresencaMembrosConfirmada] = useState(false)


    const fetchFamilyData = useCallback(async () => {


        const data = await Api.getAFamily(code)

            .catch(function (err) {
                setModalError(true)

                if (err.response.status == 404) {
                    // alert(err)
                    setErrorMessage("Código inválido. Verifique e envie novamente")
                    setGuests({})
                    setCode('')
                    console.log(err);
                }
            })
            .finally(function () {
                setLoading(false);
                setSendCode(false)
                setConfirmPresence(false)

            });

        console.log(data)
        if (data !== undefined) {

            setShowWarning('ok')

            if (data.http_code == 202) {
                setShowWarning('warning')
            }

            setGuests(data)
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
                setState={setConfirmPresence}
            />

            {/* <Carrossel
                images={Images}
            /> */}

            <Location />

            <Modal
                currentState={confirmPresence}
            >
                <Confirmacao
                    setState={setConfirmPresence}
                    setCode={setCode}
                    setSendCode={setSendCode}
                    currentCode={code}
                />
            </Modal>

            {guests.id !== undefined ?
                <Modal
                    currentState={showWarning !== ''}
                >
                    <WarmingCode
                        setToFamilyMembers={setShowMembers}
                        setShowWarming={setShowWarning}
                        setConfirmPresence={setConfirmPresence}
                        warning={showWarning}
                    />
                </Modal>
                : <></>
            }

            {showMembers ?
                <Modal
                    currentState={showMembers}>
                    <Membros
                        family={guests}
                        setMembers={setGuests}
                        setOpenMembersModal={setShowMembers}
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

            {modalError ?
                <>
                    <Modal
                        currentState={modalError}
                    >
                        <Error
                            SetError={setModalError}
                            SetConfirmarPresenca={setConfirmPresence}
                            SetPMembrosFamilia={setShowMembers}
                            SetPresencaMembrosConfirmada={setPresencaMembrosConfirmada}
                            SetMessageError={setErrorMessage}
                            Message={errorMessage}
                        />
                    </Modal>
                </> : <></>}

        </div>
    )
}


