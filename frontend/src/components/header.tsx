

import styles from './header.module.css'
import { useNavigate } from 'react-router-dom';
import { scroller } from 'react-scroll'

export default function Header() {

    const navigate = useNavigate();

    const goTo = () => {
        navigate('/teste')
    }

    // Função para rolar para uma seção específica
    const scrollToSection = (section) => {
        scroller.scrollTo(section, {
            smooth: true,
            duration: 500,
        });
    };

    return (

        <div
            className={styles.container}
        >

            {/* 
            <nav>
                <ul> */}
            <button onClick={
                () => scrollToSection("location")
            }>
                Localizacao
            </button>

            <button>
                Presentes
            </button>

            {/* <Link to='button_confirmation' smooth={true} duration={300}> */}
            <button onClick={
                () => scrollToSection("button_confirmation")}>
                Presenca
            </button>
            {/* </Link> */}

            <button>
                Historia
            </button>
            {/* 
                </ul>

            </nav> */}

        </div >
    )
}