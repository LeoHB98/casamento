
import { useCallback, useEffect, useState } from 'react'
import { Header } from './components/header'
import { Api } from './api/api';
import { ResponseGetMembers } from './models/modal.interface'
import { Confirmacao } from './components/confirmacao'
import { Membros } from './components/membro';
import { PlanoDeFundo } from './components/backgroud';
import { Images } from './assets/imgs';
import { BackgroudImage } from './assets/backgroud'
import { Carrossel } from './components/carrossel'

import Modal from './components/modal'
import ButtonConfirm from './components/button'


// import EmojiPicker from 'emoji-picker-react';
// import styles from './App.module.css'
// import Party from './assets/1f389.png'

export default function App() {

  const [family, setFamily] = useState<Partial<ResponseGetMembers>>({});

  const [openOk, setOpenOk] = useState(false)

  const [code, setCode] = useState('')
  const [sendCode, setSendCode] = useState(false)

  const [openFamilyMembers, setOpenFamilyMembers] = useState(false)
  const [membersSelected, setMembersSelected] = useState<string[]>([])

  const [isError, setIsError] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  function handleToFamilyMembers() {
    setOpenOk(false)
    setOpenFamilyMembers(true)
  }

  function handleMessageError() {
    setIsError(false)
  }

  const fetchFamilyData = useCallback(async () => {

    try {
      setIsLoading(true);
      const data = await Api.getAFamily(code);
      setFamily(data);

    } catch (err) {
      console.log(err);
      setIsError(true);

    } finally {

      setIsLoading(false);
      setCode('')
      setSendCode(false)
      setOpenOk(false)
    }
  }, [code]);

  const confirmMembers = useCallback(async () => {
    try {
      setIsLoading(true)
      if (membersSelected.length > 0) {
        const data = await Api.confirmationMembers(membersSelected);
        console.log(data);
      }
    } catch (err) {
      console.log(err);
      setIsError(true);
    } finally {
      setMembersSelected([]);
      setIsLoading(false)
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


      <PlanoDeFundo
        images={BackgroudImage}
      />

      <Header />

      <ButtonConfirm
        setState={setOpenOk}
      />

      <Carrossel
        images={Images}
      />

      <Modal
        currentState={openOk}
      >
        <Confirmacao
          setState={setOpenOk}
          setCode={setCode}
          setSendCode={setSendCode}
          currentCode={code}
        />
      </Modal>

      {
        isError ?
          <>
            <Modal
              currentState
            >
              <div>
                Algo aconteceu de errado
                😕
                <button onClick={handleMessageError}>
                  OK
                </button>
              </div>
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

      {openFamilyMembers ?
        <Modal
          currentState={openFamilyMembers}>
          <Membros
            family={family}
            setFamily={setFamily}
            setOpenFamily={setOpenFamilyMembers}
            setMembersSelected={setMembersSelected}
          />
        </Modal>
        : <></>
      }

      {isLoading ?
        <Modal
          currentState={true}
        >
          <p>Aguarde...</p>
        </Modal>
        : <></>}


      {/* <div
        className={styles.logo}
      >
        <img
          src={Party}
        />
        <p>
          Parabens voce foi convidado!!!
        </p>
      </div> */}

    </div>
  )
}


