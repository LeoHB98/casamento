
import { Header } from './components/header'
import { useEffect, useState } from 'react'
import { Post } from './api/api';
import { Result } from './models/modal.interface'
import { Confirmacao } from './components/confirmacao'

import Modal from './components/modal'
import ButtonConfirm from './components/button'


import { Carrossel } from './components/carrossel'
import Img1 from './assets/img1.jpg'
const images = [
  Img1,
]

import { Membros } from './components/membro';
// import EmojiPicker from 'emoji-picker-react';
// import Party from './assets/1f389 (1).png'

export default function App() {

  const [family, setFamily] = useState<Partial<Result>>({});

  const [openModal, setOpenModal] = useState(false)

  const [code, setCode] = useState('')
  const [sendCode, setSendCode] = useState(false)

  const [openFamily, setOpenFamily] = useState(false)
  const [membersSelected, setMembersSelected] = useState([''])

  const [isError, setIsError] = useState(false)

  function MessageAfterSendCode() {
    setOpenModal(false)
    setOpenFamily(true)
  }

  function MessageError() {
    setIsError(false)

  }

  useEffect(() => {

    if (sendCode && (code.length > 0)) {


      Post.getAFamily(code).then((data) => {
        setFamily(data)

      }).catch((err) => {
        console.log(err)
        setIsError(true)
      });

      setCode('')
      setSendCode(false)
      setOpenModal(false)

      if (membersSelected.length > 0) {
        Post
      }

      // return () => { }
    }


  },
    [
      sendCode,
      code,
      openFamily,
      membersSelected
    ]);


  return (
    <div >

      <Header />
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


      <Carrossel
        images={images}
      />

      <ButtonConfirm
        setState={setOpenModal}
      />

      <Modal
        currentState={openModal}
      >
        <Confirmacao
          setState={setOpenModal}
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
                <button onClick={MessageError}>
                  OK
                </button>
              </div>
            </Modal>
          </> : <></>
      }

      {!sendCode && family.id !== undefined ?
        <Modal
          currentState={!sendCode}>
          <div>
            Confirmacao aceita!
            <button onClick={MessageAfterSendCode}>
              OK
            </button>
          </div>
        </Modal>
        : <></>
      }

      {openFamily ?
        <Modal
          currentState={openFamily}>
          <Membros
            family={family}
            setFamily={setFamily}
            setOpenFamily={setOpenFamily}
            setMembersSelected={setMembersSelected}
          />
        </Modal>
        : <></>
      }

    </div>
  )
}


