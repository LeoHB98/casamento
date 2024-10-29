import { useCallback, useEffect, useState } from "react";
import styles from "./guests.module.css";
import { MembersData } from "../models/invite/modal.interface";
import { Api } from "../api/api";
import { Header } from "../models/header";
import Modal from "../components/invite/modal";
import { AddGuests } from "../components/guests/addGuests";
import { AllGuests } from "../components/guests/allGuests";

export function Guests() {
  const [openAddWindow, setOpenAddWindow] = useState(false);
  const [guests, setGuests] = useState<Partial<MembersData[]>>();

  const [reload, setReload] = useState(true);

  const [totalMembers, setTotalMembers] = useState(Number);

  const fecthCountMembers = useCallback(async () => {
    const c = await Api.getCountMembers().catch(function (err) {
      console.log(err);
      return;
    });

    if (c) {
      console.log(c);

      if (c.response?.code && c.response?.code != 200) {
        return;
      }

      setTotalMembers(c.quantidade);
    }
  }, []);

  const fetchAllMembers = useCallback(async () => {
    const g = await Api.getGuests().catch(function (err) {
      console.log(err);
    });

    fecthCountMembers();

    if (g) {
      setGuests(g);
    }

    setReload(false);
  }, [fecthCountMembers]);

  useEffect(() => {
    if (reload) {
      fetchAllMembers();
    }
  }, [fetchAllMembers, reload]);

  return (
    <>
      <Header
        toPage="noivos"
        middle="Lista de convidados"
        SetOpenWindow={setOpenAddWindow}
        hasAdd={true}
      />
      <div className={styles.box}>
        <Modal currentState={openAddWindow}>
          <AddGuests SetOpenWindow={setOpenAddWindow} SetReload={setReload} />
        </Modal>

        {guests && guests?.length > 0 ? (
          <div className={styles.round}>
            Total familias:
            <div className={styles.circle}>{guests?.length}</div>
          </div>
        ) : null}

        {totalMembers > 0 ? (
          <div className={styles.round}>
            Total de participantes cadastrados:
            <div className={styles.circle}>{totalMembers}</div>
          </div>
        ) : (
          ""
        )}

        {guests !== undefined && guests.length > 0 ? (
          <AllGuests
            reloadGuests={setReload}
            guests={guests.filter(
              (guest): guest is MembersData => guest !== undefined
            )}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
