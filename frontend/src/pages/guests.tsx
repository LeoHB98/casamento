
import { useCallback, useEffect, useState } from "react";
import styles from './guests.module.css'
import { MembersData } from "../models/invite/modal.interface";
import { Api } from "../api/api";
import { Header } from "../models/gifts/header";
import Modal from "../components/invite/modal";
import { AddGuests } from "../components/guests/addGuests";
import { AllGuests } from "../components/guests/allGuests";

export function Guests() {

    const [openWindow, setOpenWindow] = useState(false)
    const [guests, setGuests] = useState<Partial<MembersData[]>>()

    const fetchAllMembers = useCallback(

        async () => {

            const g = await Api.getGuests()
                .catch(function (err) {
                    console.log(err)
                })

            if (g) {
                setGuests(g)
            }

        }, []);

    useEffect(() => {
        fetchAllMembers()
    }, [fetchAllMembers])

    return (

        <>
            <Header
                toPage="noivos"
                middle="Lista de convidados"
                SetOpenWindow={setOpenWindow}
                hasAdd={true}
            />
            <div className={styles.box}>

                <Modal
                    currentState={openWindow}
                >
                    <AddGuests
                        SetOpenWindow={setOpenWindow}
                    />
                </Modal>

                {
                    guests !== undefined && guests.length > 0 ?
                        <AllGuests
                            guests={
                                guests.filter(
                                    (guest): guest is MembersData => guest !== undefined)}
                        /> : <></>
                }

            </div>
        </>

    )
}