import { useState } from 'react'
import { Result } from '../models/modal.interface'
import styles from './membro.module.css'


import { CheckCircle, Circle } from 'phosphor-react'

interface MembrosProps {
    family: Result
    setFamily: (value: Result) => void
    setOpenFamily: (value: boolean) => void
    setMembersSelected: (value: string[]) => void
}

interface MembroProps {
    membro: string
    membros: string[]
    setMembersSelected: (value: string[]) => void
}

export function Membros(props: MembrosProps) {

    const [members, setMembers] = useState([''])

    function handleMessageMembers() {
        props.setOpenFamily(false)
        props.setFamily({})
        props.setMembersSelected(members)
    }


    return (
        <div className={styles.container}>
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

            <p>
                {members}
            </p>

            <button
                onClick={handleMessageMembers}
            >
                Enviar
            </button>
        </div>
    )

}


function Membro(props: MembroProps) {

    const [memberSelected, setMemberSelected] = useState(false)

    function SetClick() {

        setMemberSelected(!memberSelected)

        let updateMemberSelected: string[] = [...props.membros]


        if (memberSelected) {
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
                className={`${!memberSelected ? styles.checked : styles.check}`}
                onClick={SetClick}

            >
                {!memberSelected ?
                    <Circle
                        size={20}
                    />
                    :
                    <CheckCircle
                        size={20}
                    />}

            </button>

            <p
                className={`${memberSelected ? styles.checked : styles.check}`}
            >
                {props.membro}
            </p>

        </div>
    )

}