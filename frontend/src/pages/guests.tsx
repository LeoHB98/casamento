
import { Header } from "../models/gifts/header";
import { useCallback, useEffect, useState } from "react";
import { CloseButton } from "../components/invite/closeButton";
import Modal from "../components/invite/modal";
import styles from './guests.module.css'
import { Api } from "../api/api";
import { ResponseGetMembers } from "../models/invite/modal.interface";


export function Guests() {

    const [openWindow, setOpenWindow] = useState(false)
    const [guests, setGuests] = useState<Partial<ResponseGetMembers[]>>()

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
                <div>
                    <CloseButton
                        setBoolean={setOpenWindow}
                    />
                    <div>

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
                </div>
            </Modal>
        </div>

    )
}