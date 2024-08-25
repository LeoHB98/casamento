

import { useNavigate } from 'react-router-dom';
import styles from './header.module.css'

import { scroller } from 'react-scroll'

export default function Header() {

    const navigate = useNavigate();

    const goTo = (value: string) => {
        navigate(`/${value}`)
    }

    // Função para rolar para uma seção específica
    const scrollToSection = (section: string) => {
        scroller.scrollTo(section, {
            smooth: true,
            duration: 1000,
        });
    };

    return (

        <div
            className={styles.container}
        >

            {/* <nav>
                <ul> */}
            <button onClick={
                () => scrollToSection("location")
            }>
                Localização
            </button>

            <button onClick={() => goTo('gifts')}>
                Presentes
            </button>

            <button onClick={
                () => scrollToSection("button_confirmation")}>
                Confirmar Presença
            </button>

            <button onClick={() => goTo('noivos')}>
                Noivos
            </button>


            {/* <button>                 História            </button> */}
            {/* 
                </ul>

            </nav> */}

        </div >
    )
}