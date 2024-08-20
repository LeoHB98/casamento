import styles from './envio_membro.module.css'

interface membrosEnviadosProps {
    setMembrosEnviados: (value: boolean) => void;
    setMembersSelected: (value: string[]) => void;
}

export default function MembrosEnviados(props: membrosEnviadosProps) {

    function handleSetMembrosEnviados() {
        props.setMembrosEnviados(false)
        props.setMembersSelected([])
    }

    return (
        <div className={styles.container}>
            <h3>
                <p>
                    Enviado com sucesso ✅
                </p>
            </h3>

            <button onClick={handleSetMembrosEnviados}>
                OK
            </button>
        </div>
    )

}