import styles from "./header.module.css";

import { scroller } from "react-scroll";
import Location from "./location";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  // Função para rolar para uma seção específica
  const scrollToSection = (section: string) => {
    scroller.scrollTo(section, {
      smooth: true,
      duration: 1000,
    });
  };

  const [openMap, setOpenMap] = useState(false);

  function ToMap() {
    setOpenMap(true);
  }
  const navigate = useNavigate();

  const goTo = (value: string) => {
    navigate(`/${value}`);
  };

  return (
    <div className={styles.container}>
      {/* <button onClick={
                () => scrollToSection("location")
            }>
                Localização
            </button> */}

      <button onClick={ToMap}>Localização</button>
      {/* 
            <button onClick={
                () => scrollToSection("button_confirmation")}>
                Confirmar Presença
            </button> */}

      <Location OpenWindow={openMap} SetOpenMap={setOpenMap} />

      {/* <div className={styles.container}> */}
      <button onClick={() => goTo("login")}>Àrea Noivos</button>
      {/* </div> */}
    </div>
  );
}
