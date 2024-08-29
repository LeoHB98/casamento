import styles from './header.module.css'

import { scroller } from 'react-scroll'
import Location from './location';
import { useState } from 'react';

export default function Header() {

    // Função para rolar para uma seção específica
    const scrollToSection = (section: string) => {
        scroller.scrollTo(section, {
            smooth: true,
            duration: 1000,
        });
    };
    const [openMap, setOpenMap] = useState(false)

    function ToMap() {

        setOpenMap(true)

    }

    return (

        <div
            className={styles.container}
        >

            {/* <button onClick={
                () => scrollToSection("location")
            }>
                Localização
            </button> */}

            <button onClick={ToMap}>
                Localização
            </button>

            <button onClick={
                () => scrollToSection("button_confirmation")}>
                Confirmar Presença
            </button>

            <Location
                OpenWindow={openMap}
                SetOpenMap={setOpenMap}
            />

        </div >
    )
}

