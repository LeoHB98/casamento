import { useState } from 'react'
import { ResponseGetMembers } from '../models/modal.interface'
import styles from './membro.module.css'


// import { CheckCircle, Circle } from 'phosphor-react'

interface MembrosProps {
    family: ResponseGetMembers
    setFamily: (value: ResponseGetMembers) => void
    setOpenFamily: (value: boolean) => void
    setMembersSelected: (value: string[]) => void
}

interface MembroProps {
    membro: string
    membros: string[]
    setMembersSelected: (value: string[]) => void
}

export function Membros(props: MembrosProps) {

    const [members, setMembers] = useState<string[]>([])

    function handleMessageMembers() {
        props.setOpenFamily(false)
        props.setFamily({})
        props.setMembersSelected(members)
    }


    return (
        <div className={styles.container}>
            <p>
                <h3>
                    Selecione os membros da família:
                </h3>
            </p>

            <div className={styles.membersContainer}>
                {
                    props.family.membros?.map(
                        (member) => (
                            <Membro
                                key={member.id}
                                membro={member.nome}
                                membros={members}
                                setMembersSelected={setMembers}
                            />
                        ))
                }

            </div>

            <div className={styles.send}>
                <button
                    onClick={handleMessageMembers}
                >
                    Enviar
                </button>
            </div>

        </div>
    )

}


function Membro(props: MembroProps) {

    const [memberSelected, setMemberSelected] = useState(false)

    function SetMember() {

        setMemberSelected(!memberSelected)

        let updateMemberSelected: string[] = [...props.membros]


        if (!memberSelected) {
            updateMemberSelected = [...updateMemberSelected, props.membro];

        } else {

            updateMemberSelected =
                updateMemberSelected.filter((member) => member !== props.membro);
        }

        props.setMembersSelected(updateMemberSelected)

    }

    return (
        <div className={styles.memberContainer}>

            <button
                className={`${memberSelected ? styles.checkedButton : styles.toCheck}`}
                onClick={SetMember}

            >
                {/* {!memberSelected ?
                    <Circle
                        size={20}
                    />
                    :
                    <CheckCircle
                        size={20}
                    />} */}

                <p>
                    {props.membro}
                </p>

            </button>
        </div>
    )

}