import { useCallback, useEffect, useState } from "react";
import styles from "./guests.module.css";
import { MembersData } from "../models/invite/modal.interface";
import { Api } from "../api/api";
import { Header } from "../models/header";
import Modal from "../components/invite/modal";
import { AddGuests } from "../components/guests/addGuests";
import { AllGuests } from "../components/guests/allGuests";
import { Search } from "../components/guests/search";
import DropdownButton from "../components/tools/dropdown";
import { Status } from "../components/guests/status";

export function Guests() {
  const [openAddWindow, setOpenAddWindow] = useState(false);
  const [guests, setGuests] = useState<MembersData[]>([]);
  const [originalGuests, setOriginalGuests] =
    useState<Partial<MembersData[]>>();

  const [reload, setReload] = useState(true);

  const [typeReload, setTypeReload] = useState("");

  function handleChangeTypeReload(option: string) {
    setTypeReload(option);
    setReload(true);
  }

  // const fecthCountMembers = useCallback(async () => {
  //   // const c = await Api.getCountMembers().catch(function (err) {
  //   //   console.log(err);
  //   //   return;
  //   // });

  //   // if (!c) {
  //   //   return;
  //   // }

  //   // console.log(c);

  //   // if (c.response?.code && c.response?.code != 200) {
  //   //   return;
  //   // }

  //   // setTotalMembers(c.quantidade);

  //   setLoadStatus(false);
  // }, [guests]);

  const fetchAllMembers = useCallback(async () => {
    const allM = await Api.getGuests(typeReload).catch(function (err) {
      console.log(err);
    });

    console.log(allM);

    if (allM) {
      setGuests(allM);
      setOriginalGuests(allM);
    }

    setReload(false);
  }, [typeReload]);

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

        <div className={styles.options}>
          <Status setReload={setReload} guests={guests} />

          <DropdownButton setOption={handleChangeTypeReload} />
        </div>

        {guests && originalGuests && (
          <Search
            members={guests.filter(
              (guest): guest is MembersData => guest !== undefined
            )}
            originaisMembers={originalGuests.filter(
              (originalGuest): originalGuest is MembersData =>
                originalGuest !== undefined
            )}
            setMembers={setGuests}
          />
        )}

        {guests !== undefined && guests.length > 0 && (
          <AllGuests
            reloadGuests={setReload}
            guests={guests.filter(
              (guest): guest is MembersData => guest !== undefined
            )}
          />
        )}
      </div>
    </>
  );
}
