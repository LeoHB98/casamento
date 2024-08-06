
import { useCallback, useEffect, useState } from 'react'
import { Api } from './api/api';
import { ResponseGetMembers } from './models/modal.interface'
import { Confirmacao } from './components/confirmacao'
import { Membros } from './components/membro';
import { PlanoDeFundo } from './components/background';
import { Images } from './assets/imgs';
import { BackgroudImage } from './assets/backgroud'
import { Carrossel } from './components/carrossel'

import Modal from './components/modal'
import { Error } from './components/erro';
import MembrosEnviados from './components/envio_membros';


// import EmojiPicker from 'emoji-picker-react';
import styles from './App.module.css'
// import Party from './assets/1f389.png'

export default function App() {


  //Modais
  const [confirmarPresenca, setConfirmarPresenca] = useState(false)
  const [pMembrosFamilia, setPMembrosFamilia] = useState(false)
  const [modalError, setModalError] = useState(false)
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

    try {
      setLoading(true);
      const data = await Api.getAFamily(code);
      setFamily(data);

    } catch (err) {
      console.log(err);
      setModalError(true);

    } finally {

      setLoading(false);
      setCode('')
      setSendCode(false)
      setConfirmarPresenca(false)
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
    <div className={styles.container}>

      <PlanoDeFundo
        image={BackgroudImage}
        setConfirmarPresenca={setConfirmarPresenca}
      />

      <Carrossel
        images={Images}
      />

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
            setFamily={setFamily}
            setOpenFamily={setPMembrosFamilia}
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


