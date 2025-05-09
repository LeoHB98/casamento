import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { CloseButton } from "../invite/closeButton";

import styles from "./addGuests.module.css";
import { Members, MembersData } from "../../models/invite/modal.interface";
import { Check, X } from "phosphor-react";
import { Api } from "../../api/api";
import WarmingCode from "../invite/warming";

interface AddGuestsProps {
  SetOpenWindow: (value: boolean) => void;
  SetReload: (value: boolean) => void;
}

export function AddGuests(props: AddGuestsProps) {
  const [gs, setGs] = useState("");
  const [guests, setGuests] = useState<string[]>();
  const [compiledGuests, setCompiledGuests] = useState<MembersData>(
    {} as MembersData
  );

  const [nameChief, setNameChief] = useState("");

  const [sendData, setSendData] = useState(false);
  const [openWarmingCode, setWarmingCode] = useState(false);
  const [warming, setWarming] = useState("");

  function onChangeAddChef(event: ChangeEvent<HTMLInputElement>) {
    const nameChef = event.target.value;

    // if (g.trim().length > 0) {
    setNameChief(nameChef);
    // }
  }

  function onChangeAddGuest(event: ChangeEvent<HTMLInputElement>) {
    setGs(event.target.value);
  }

  function handleAddGuest() {
    if (gs.trim() !== "") {
      setGuests([...(guests || []), gs]);
    }

    setGs("");
  }

  function handleAddMembers(event: FormEvent) {
    event.preventDefault();

    let Gs: Members[] = [];

    if (nameChief === "") {
      alert("Por favor, preencha o nome do representante do grupo adicionado");
      return;
    }

    if (guests === undefined || guests.length === 0) {
      alert("Por favor, adicione pelo menos um membro do grupo");
      return;
    }

    guests.forEach((guest) => {
      const G: Members = { nomeMembro: guest };
      Gs = [...Gs, G];
    });

    setCompiledGuests(() => ({
      membros: [...Gs],
      nomeFamilia: nameChief,
    }));

    console.log(compiledGuests);

    if (compiledGuests !== undefined) {
      setSendData(true);
    }
  }

  function handleKeyPress(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddGuest();
    }
  }

  const fecthPostMembers = useCallback(async () => {
    try {
      setSendData(false);
      const resp = await Api.postGuests(compiledGuests);
      if (!resp) {
        return;
      }

      console.log(resp);

      setWarming("cadastro");
      setWarmingCode(true);
    } catch (err) {
      console.log(err);
      setWarmingCode(true);
      setWarming("error");
    } finally {
      setNameChief("");
      setGuests([]);
      props.SetReload(true);
      setCompiledGuests({} as MembersData);
    }
  }, [compiledGuests, props]);

  useEffect(() => {
    if (sendData) {
      fecthPostMembers();
    }
  }, [fecthPostMembers, sendData]);

  return (
    <div className={styles.container}>
      <CloseButton
        setBoolean={props.SetOpenWindow}
        setStringArray={setGuests}
      />

      <div className={styles.content}>
        <form onSubmit={handleAddMembers}>
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

            <button type="button" onClick={handleAddGuest}>
              <Check size={20} />
            </button>
          </div>
          {guests !== undefined ? (
            <MemberAdded guests={guests} SetGuests={setGuests} />
          ) : (
            <></>
          )}

          {guests !== undefined &&
          guests.length > 0 &&
          nameChief.trim() !== "" ? (
            <div className={styles.finalButton}>
              <button type="submit" title="Enviar convidados">
                Adicionar
              </button>
            </div>
          ) : (
            <></>
          )}

          {openWarmingCode ? (
            <WarmingCode
              setToValueBool1={props.SetOpenWindow}
              setToValueBool2={setWarmingCode}
              setShowWarming={setWarming}
              warning={warming}
            />
          ) : (
            <></>
          )}
        </form>
      </div>
    </div>
  );
}

interface MemberAddedProps {
  guests: string[];
  SetGuests: (value: string[]) => void;
}

function MemberAdded(props: MemberAddedProps) {
  const shouldScroll = props.guests.length > 4;

  function handleRemoveGuest(index: number) {
    let gs = [...props.guests];

    gs = gs.filter((_guest, i) => i !== index);

    props.SetGuests(gs);
  }

  return (
    <div /*className={styles.box}*/>
      {props.guests.length > 0 ? (
        <div
          className={
            !shouldScroll ? styles.containerMA : styles.scroll_container
          }
        >
          {props.guests?.map((guest, index) =>
            guest.trim() !== "" ? (
              <div className={styles.item}>
                <p>{`${guest}`}</p>
                <button onClick={() => handleRemoveGuest(index)}>
                  <X size={16} />
                </button>
              </div>
            ) : (
              <></>
            )
          )}
        </div>
      ) : (
        <></>
      )}
      {/* {shouldScroll ? <p>(Arraste para o lado)</p> : <></>} */}
    </div>
  );
}
