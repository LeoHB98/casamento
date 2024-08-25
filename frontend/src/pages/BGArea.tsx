import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";

export default function BGArea() {

    const navigate = useNavigate();

    const goTo = (value: string) => {
        navigate(`/${value}`)
    }

    return (
        <>
            <button
                onClick={() => goTo('')}
            >
                <ArrowLeft />
            </button>

            <button
                onClick={() => goTo('guests')}
            >
                convidados
            </button>
        </>
    )
}