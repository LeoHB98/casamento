import { Pen, Trash } from "phosphor-react";
import { Members, MembersData } from "../../models/invite/modal.interface";
import styles from './allGuests.module.css'

interface AllGuestsProps {
    guests: (MembersData[])
}

export function AllGuests(props: AllGuestsProps) {
    return (
        <div className={styles.box}>
            {props.guests !== undefined && props.guests.length > 0 ?

                props.guests?.map(
                    (guest) => (

                        <CompiledGuest
                            guest={guest} />
                    )
                )
                : <></>
            }
        </div>
    )
}

interface GuestsProps {
    guest: (MembersData)
}

function CompiledGuest(props: GuestsProps) {

    return (
        <div className={styles.card}>

            <div className={styles.header}
            >

                <p>
                    {props.guest.nomeFamilia}
                </p>

                <div className={styles.button}>
                    <button>
                        <Pen
                            size={25}
                            color="white"
                        />
                    </button>
                    <button>

                        <Trash
                            size={25}
                            color="white"
                        />
                    </button>
                </div>
            </div>

            <p className={styles.item}
            >{`Codigo: ${props.guest.codigo}`}</p>
            <p className={styles.item}>
                {`Data Criacao: ${props.guest.dataCriacao}`}</p>

            <div className={styles.m}>
                {props.guest.membros?.map(
                    (mem) => (

                        <Guest
                            member={mem}
                        />
                    )
                )}
            </div>
        </div>
    )

}

interface GuestProps {
    member: Members
}

function Guest(props: GuestProps) {

    return (
        <div className={styles.containerGuest}>
            <p>
                {`${props.member.nomeMembro} - `}
            </p>
            <p>
                {`Confirmado? ${props.member.confirmado}`}
            </p>
        </div>
    )

}

