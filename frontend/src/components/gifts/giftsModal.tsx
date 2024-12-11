import { CloseButton } from "../invite/closeButton";
import Modal from "../invite/modal";

const GiftsDesc = [
  "Panelas",
  "Baixelas",
  "Assadeiras",
  "Porta frios",
  "Faqueiro cx papelao ",
  "Escorrendor de massa",
  "Xicaras de café ",
  "Conj bolo",
  "Panelas avulsas",
  "Ap de jantar 30 pcs",
  "Frigideira ",
  "Panela de pressão ",
  "Jogo 30 pcs (copo)",
  "Conj sobremesa ",
  "Conj caipirinha ",
  "Copos uso diário ",
  "Galheteiros",
  "Marinex ",
  "Garrafa termica ",
  "Fruteira aço ",
  "Cuscuzeira",
  "Cepo de facas",
  "Tábua de corte",
  "Saladeira",
  "Taças ",
  "Escorredor de louça ",
  "Mini processador",
  "Mixer",
  "Sanduicheira",
];

export interface GiftsProps {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}

import styles from "./giftsModal.module.css";
export function Gifts(props: GiftsProps) {
  function handleStoreGifts() {
    window.open(
      "https://api.whatsapp.com/send/?phone=%2B5519991380335&text&type=phone_number&app_absent=0",
      "_blank"
    );
  }

  return (
    <Modal currentState={props.openModal}>
      <div className={styles.box}>
        <CloseButton setBoolean={props.setOpenModal} />

        <p>
          <h2>Presentes</h2>
        </p>

        <p>
          Obs: essas são sugestões que o casal deseja. Caso queira presentear
          com algo diferente, contate os noivos.
        </p>

        <h3>Entre em contato direto com a loja:</h3>
        <p>Peça a lista pelo whatsapp do nosso casamento</p>
        <button
          onClick={handleStoreGifts}
          style={{
            color: "white",
            marginTop: "1rem",
            marginBottom: "1rem",
            width: "50%",
            alignSelf: "center",
          }}
        >
          Clique aqui
        </button>
        {/* 
        <div className={styles.scrollSpace}>
          {GiftsDesc.map((gift) => (
            <div className={styles.item}>
              <p>{gift}</p>
            </div>
          ))}
        </div> */}
      </div>
    </Modal>
  );
}
