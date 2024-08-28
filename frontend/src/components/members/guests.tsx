
import { Header } from "../../models/gifts/header";
import { useCallback, useEffect, useState } from "react";

import Modal from "../invite/modal";
import styles from './guests.module.css'
import { Api } from "../../api/api";
import { MembersData } from "../../models/invite/modal.interface";
import { AddGuests } from "./addGuests";



export function Guests() {

    const [openWindow, setOpenWindow] = useState(false)
    const [guests, setGuests] = useState<Partial<MembersData[]>>()

    const fetchAllMembers = useCallback(

        async () => {

            const g = await Api.getFamily()
                .catch(function (err) {
                    console.log(err)
                })

            if (g !== undefined) {

                console.log(g)

                setGuests(g)

            }

        }, []);

    useEffect(() => {
        fetchAllMembers()
    })

    return (

        <div className={styles.box}>
            <Header
                toPage="noivos"
                middle="Lista de convidados"
                SetOpenWindow={setOpenWindow}
            />

            <Modal
                currentState={openWindow}
            >
                <AddGuests
                    SetOpenWindow={setOpenWindow}
                // SetGuests={setGuests}
                />
            </Modal>


            {
                guests?.map(
                    (guest) => (
                        <div>
                            <p>
                                {`${guest}`}
                            </p>
                        </div>
                    )
                )
            }
        </div>

    )
}