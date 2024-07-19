import { Result } from '../models/modal.interface'
import styles from './membro.module.css'

interface MembrosProps {
    family: Result
    setFamily: (value: Result) => void
    setOpenFamily: (value: boolean) => void
    setMembersSelected: (value: string[]) => void
}

export function Membros(props: MembrosProps) {

    function handleMessageMembers() {
        props.setOpenFamily(false)
        props.setFamily({})
    }



    return (
        <div className={styles.container}>
            {
                props.family.nome_membros?.map(
                    (member) => (
                        Membro(member)
                    ))
            }
            <button
                onClick={handleMessageMembers}
            > OK</button>
        </div>
    )

}
function Membro(member: string) {

    return (
        <div className={styles.member}>
            <button>
                {`member ${member}`}
            </button>
        </div>
    )

}