import { useState } from 'react'
import { MembersData } from '../../models/invite/modal.interface'
import styles from './membro.module.css'
import { CloseButton } from './closeButton'


// import { CheckCircle, Circle } from 'phosphor-react'

interface MembrosProps {
    family: MembersData
    setMembers: (value: MembersData) => void
    setOpenMembersModal: (value: boolean) => void
    setMembersSelected: (value: string[]) => void
}

interface MembroProps {
    membro: string
    membros: string[]
    setMembersSelected: (value: string[]) => void
}

interface MProps {
    membro: string
}

export function Membros(props: MembrosProps) {

    const [members, setMembers] = useState<string[]>([])

    function handleMessageMembers() {
        props.setOpenMembersModal(false)
        props.setMembersSelected(members)
        props.setMembers({})
    }

    return (
        <div className={styles.container}>

            <CloseButton
                setBoolean={props.setOpenMembersModal}
                setObjetct={props.setMembers}
                setStringArray={props.setMembersSelected}
            />

            <h3>
                Selecione todos aqueles que participarão evento:
            </h3>

            <div className={styles.membersContainer}>
                {
                    props.family.membros?.map(
                        (member) => (
                            <>
                                {member.nome !== undefined ?
                                    <Membro
                                        key={member.id}
                                        membro={member.nome}
                                        membros={members}
                                        setMembersSelected={setMembers}
                                    />

                                    : <></>}
                            </>
                        ))
                }

            </div>

            <p>Você selecionou:</p>

            <div className={styles.membersSelected}>
                {
                    members?.map(
                        (member) => (
                            <MemberSeleted
                                membro={member}
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

function MemberSeleted({ membro }: MProps) {
    return (
        <div >
            {` ${membro} |`}
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