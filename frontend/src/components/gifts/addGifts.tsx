import { ChangeEvent, FormEvent, useState } from "react";
import { Api } from "../../api/api";
import { Present } from "../../models/gifts/modal.interface";

import Modal from "../invite/modal";
import styles from './addGifts.module.css'
import { CloseButton } from "../invite/closeButton";


interface AddGiftsProps {
    OpenAddGift: boolean
    SetOpenAddGift: (value: boolean) => void
}

export default function AddGifts(props: AddGiftsProps) {

    const [gift, setGift] = useState('')
    const [suggestion, setSuggestion] = useState('')


    function handleAddGift(event: FormEvent) {

        // let g: string[] = [...gift]
        event.preventDefault()
        const p: Present = {
            name: gift,
            suggestion: suggestion,
        }


        Api.postPresents(p)

    }

    function handleAddGiftName(event: ChangeEvent<HTMLInputElement>) {

        if (event.target.value.trim() !== '') {
            setGift(event.target.value)
            console.log(gift)
        }

    }

    function handleAddSuggestion(event: ChangeEvent<HTMLInputElement>) {

        if (event.target.value.trim() !== '') {
            setSuggestion(event.target.value)
            console.log(suggestion)
        }

    }


    return (

        <>
            <Modal
                currentState={props.OpenAddGift}
            >


                <div className={styles.close}>
                    <CloseButton
                        setBoolean={props.SetOpenAddGift}
                    />
                </div>


                <div className={styles.container}>

                    <form
                        onSubmit={handleAddGift}
                    >

                        <p>Adicione o nome do presente</p>
                        <input
                            name="giftname"
                            type="text"
                            onChange={handleAddGiftName}
                        />

                        <p>Adicione a sugestao do link de compra (opcional)</p>
                        <input
                            name="suggestion"
                            type="text"
                            onChange={handleAddSuggestion}
                        />


                        <div className={styles.buttonSpace}>
                            <button
                                type="submit"
                                name="giftname"
                            >Adicionar
                            </button>

                        </div>
                    </form>

                </div>


            </Modal>

        </>
    )

}