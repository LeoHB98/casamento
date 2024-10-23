import { Pen, Trash } from "phosphor-react";
import { Members, MembersData } from "../../models/invite/modal.interface";
import styles from "./allGuests.module.css";
import { useCallback, useEffect, useState } from "react";
import { Api } from "../../api/api";
import Modal from "../invite/modal";
import { CloseButton } from "../invite/closeButton";

interface AllGuestsProps {
  guests: MembersData[];
  reloadGuests: (value: boolean) => void;
}

export function AllGuests(props: AllGuestsProps) {
  const [reload, setReaload] = useState(false);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    if (reload) {
      props.reloadGuests(true);

      if (deleted) {
        setReaload(false);
      }
    }
  }, [reload, deleted, props]);

  return (
    <div className={styles.box}>
      {props.guests !== undefined && props.guests.length > 0 ? (
        props.guests?.map((guest) => (
          <CompiledGuest
            guest={guest}
            setReload={setReaload}
            setDeleted={setDeleted}
          />
        ))
      ) : (
        <></>
      )}
      {deleted ? (
        <Modal currentState={deleted}>
          <>
            <CloseButton setBoolean={setDeleted} />
            <p>Membro deletado com sucesso!</p>
          </>
        </Modal>
      ) : (
        <></>
      )}
    </div>
  );
}

interface GuestsProps {
  guest: MembersData;
  setReload: (value: boolean) => void;
  setDeleted: (value: boolean) => void;
}

function CompiledGuest(props: GuestsProps) {
  const handleRemove = useCallback(async () => {
    if (props.guest.codigo) {
      try {
        const resp = await Api.deleteGuests(props.guest.codigo);
        if (resp.code === 200) {
          props.setReload(true);
          props.setDeleted(true);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }, [props]);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <p>{props.guest.nomeFamilia}</p>

        <div className={styles.button}>
          <button>
            <Pen size={25} color="white" />
          </button>
          <button onClick={handleRemove}>
            <Trash size={25} color="white" />
          </button>
        </div>
      </div>

      <p className={styles.item}>{`Codigo: ${props.guest.codigo}`}</p>
      <p className={styles.item}>
        {`Data Criacao: ${props.guest.dataCriacao}`}
      </p>

      <div className={styles.m}>
        {props.guest.membros?.map((mem) => (
          <Guest member={mem} />
        ))}
      </div>
    </div>
  );
}
interface GuestProps {
  member: Members;
}

function Guest(props: GuestProps) {
  return (
    <div className={styles.containerGuest}>
      <p>{`${props.member.nomeMembro} - `}</p>
      <p>{`Confirmado? ${props.member.confirmado}`}</p>
    </div>
  );
}
