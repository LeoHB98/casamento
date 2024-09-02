
import { useCallback, useEffect, useState } from "react";
import styles from './guests.module.css'
import { MembersData } from "../models/invite/modal.interface";
import { Api } from "../api/api";
import { Header } from "../models/header";
import Modal from "../components/invite/modal";
import { AddGuests } from "../components/guests/addGuests";
import { AllGuests } from "../components/guests/allGuests";



export function Guests() {

    const [openAddWindow, setOpenAddWindow] = useState(false)
    const [guests, setGuests] = useState<Partial<MembersData[]>>()

    const [reload, setReload] = useState(false)

    const fetchAllMembers = useCallback(

        async () => {

            const g = await Api.getGuests()
                .catch(function (err) {
                    console.log(err)
                })

            if (g) {
                setGuests(g)
            }

            setReload(false)
        }

        , []);

    useEffect(() => {
        fetchAllMembers()

        if (reload) {
            fetchAllMembers()
        }

    }, [fetchAllMembers, reload])


    return (

        <>
            <Header
                toPage="noivos"
                middle="Lista de convidados"
                SetOpenWindow={setOpenAddWindow}
                hasAdd={true}
            />
            <div className={styles.box}>

                <Modal
                    currentState={openAddWindow}
                >
                    <AddGuests
                        SetOpenWindow={setOpenAddWindow}
                        SetReload={setReload}
                    />
                </Modal>

                {
                    guests !== undefined && guests.length > 0 ?
                        <AllGuests
                            reloadGuests={setReload}
                            guests={
                                guests.filter(
                                    (guest): guest is MembersData => guest !== undefined)}
                        /> : <></>
                }
            </div>
        </>

    )
}