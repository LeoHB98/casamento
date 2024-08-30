
import { Header } from "../../models/gifts/header";
import { useCallback, useEffect, useState } from "react";

import Modal from "../invite/modal";
import styles from './guests.module.css'
import { Api } from "../../api/api";
import { MembersData } from "../../models/invite/modal.interface";
import { AddGuests } from "./addGuests";
import { AllGuests } from "./allGuests";



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

        <div className={styles.box}>
            <Header
                toPage="noivos"
                middle="Lista de convidados"
                SetOpenWindow={setOpenWindow}
                hasAdd={openWindow}
            />

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

    )
}