import { ChangeEvent, FormEvent, KeyboardEvent, useEffect, useState } from "react"
import { CloseButton } from "../invite/closeButton"

import styles from './addGuests.module.css'
import { Members, MembersData } from "../../models/invite/modal.interface";
import { Check, X } from "phosphor-react";




interface AddGuestsProps {
    SetOpenWindow: (value: boolean) => void;
    // SetGuests: (value: MembersData[]) => void;
}

export function AddGuests(props: AddGuestsProps) {

    const [gs, setGs] = useState('')
    const [guests, setGuests] = useState<string[]>()
    const [compiledGuests, setCompiledGuests] = useState<MembersData>({})

    const [nameChief, setNameChief] = useState('')


    function onChangeAddChef(event: ChangeEvent<HTMLInputElement>) {

        const g = event.target.value;

        if (g.trim().length > 0) {
            setNameChief(g)
        }

    }

    function onChangeAddGuest(event: ChangeEvent<HTMLInputElement>) {
        setGs(event.target.value)
    }

    function handleAddGuest() {

        if (gs.trim() !== '') {
            setGuests([...guests || [], gs])
        }


        setGs('')

    }

    function handleAddMembers(event: FormEvent) {
        event.preventDefault()

        let Gs: Members[] = []
        console.log('handleAddMembers acionado')

        if (nameChief !== '') {

            if (guests === undefined) {
                return
            }

            guests.forEach((guest) => {
                const G: Members = { nome: guest }
                Gs = [...Gs, G]
            })


            setCompiledGuests(
                (/*prevGuest*/) =>

                ({
                    // ...prevGuest,
                    // membros: [...(prevGuest.membros || []), ...Gs],
                    membros: [...Gs],
                    nome_familia: nameChief
                }))

            // if (compiledGuests !== undefined) {
            //     props.SetOpenWindow(false)
            // }


            // const Zero: MembersData = {}
            // const ZerOMember = {}
            // setCompiledGuests(Zero)
            // setNameChief('')
            // setGuests([])
            // setCompiledGuests(ZerOMember)

        }
    }


    function handleKeyPress(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleAddGuest();
        }
    }

    useEffect(() => {
        console.log(guests);
        console.log(compiledGuests)
    }, [guests, compiledGuests]);


    return (
        <div className={styles.container}>

            <CloseButton
                setBoolean={props.SetOpenWindow}
                setStringArray={setGuests}
            />

            <div className={styles.content}>

                <form
                    onSubmit={handleAddMembers}
                >

                    <p>Adicione o nome representante da familia ou do grupo desejado:</p>
                    <input
                        type="text"
                        name="chef"
                        onChange={onChangeAddChef}
                        value={nameChief}
                    />


                    <p>Informe os integrantes:</p>
                    <div className={styles.integers}>

                        <input
                            type="text"
                            name="members"
                            onChange={onChangeAddGuest}
                            onKeyPress={handleKeyPress}
                            value={gs}
                        />

                        <button
                            type="button"
                            onClick={handleAddGuest}
                        >
                            <Check
                                size={20}
                            />
                        </button>



                    </div>
                    {
                        guests !== undefined ?
                            <MemberAdded
                                guests={guests}
                                SetGuests={setGuests}
                            /> : <></>
                    }

                    {

                        (guests !== undefined && guests.length > 0) ?

                            <div className={styles.finalButton}>
                                <button
                                    type="submit"
                                    title="Enviar convidados"
                                >
                                    Adicionar
                                </button>
                            </div>
                            : <></>
                    }

                </form>
            </div>
        </div>
    )

}

interface MemberAddedProps {
    guests: string[]
    SetGuests: (value: string[]) => void
}

function MemberAdded(props: MemberAddedProps) {

    const shouldScroll = props.guests.length > 4;

    function handleRemoveGuest(index: number) {

        let gs = [...props.guests]

        gs = gs.filter(
            (_guest, i) => i !== index)

        props.SetGuests(gs)

    }

    return (
        <>
            {props.guests.length > 0 ?

                <div className={!shouldScroll ? styles.containerMA : styles.scroll_container}>
                    {
                        props.guests?.map(
                            (guest, index) => (

                                guest.trim() !== '' ?

                                    <div className={styles.item}>
                                        <p>{`${guest}`}</p>
                                        <button
                                            onClick={() => handleRemoveGuest(index)}
                                        >
                                            <X
                                                size={16}
                                            />
                                        </button>
                                    </div>

                                    : <></>
                            )
                        )
                    }
                </div>
                : <></>
            }
        </>
    )
}