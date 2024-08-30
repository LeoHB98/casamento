import { useState } from "react";
import { Header } from "../models/gifts/header";

import AddGifts from "../components/gifts/addGifts";
import AllGifts from "../components/gifts/gifts_storage";

import styles from './gifts.module.css'

export default function Gifts() {

    const [openAddGifts, setOpenAddGifts] = useState(false)

    return (
        <>
            <Header
                toPage="noivos"
                middle="Lista de Presentes"
                SetOpenWindow={setOpenAddGifts}
                hasAdd
            />
            <div className={styles.box}>

                <AddGifts
                    OpenAddGift={openAddGifts}
                    SetOpenAddGift={setOpenAddGifts}
                />

                <AllGifts />
            </div>
        </>


    );
}

