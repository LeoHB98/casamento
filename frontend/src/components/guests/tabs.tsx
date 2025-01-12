import { useCallback, useEffect, useState } from "react";
import classNames from "classnames";

import styles from "./tabs.module.css";
import { MembersData } from "../../models/invite/modal.interface";
import { AllGuests } from "./allGuests";

interface TabsProps {
  guests: MembersData[];
  // setGuests: (value: MembersData[]) => void;
  setReload: (value: boolean) => void;
}

export function Tabs(props: TabsProps) {
  const [activeTab, setActiveTab] = useState<string>("todos");
  const [guests, setGuests] = useState<MembersData[]>([]);

  function handleChangeTab(value: string) {
    setActiveTab(value);
  }

  const filterGuests = useCallback(
    (filterType: string): MembersData[] => {
      if (filterType === "confirmados") {
        return props.guests
          .map((guest) => ({
            ...guest,
            membros: guest.membros.filter((m) => m.confirmado === "Sim"),
          }))
          .filter((guest) => guest.membros.length > 0);
      } else if (filterType === "nconfirmados") {
        return props.guests
          .map((guest) => ({
            ...guest,
            membros: guest.membros.filter((m) => m.confirmado !== "Sim"),
          }))
          .filter((guest) => guest.membros.length > 0);
      }

      return props.guests;
    },
    [props.guests]
  );

  useEffect(() => {
    // if (reload) {
    const filtered = filterGuests(activeTab);
    setGuests(filtered);

    // }
  }, [props, activeTab, filterGuests]);

  return (
    <div>
      <div className={styles.tabs}>
        <button
          className={classNames(styles["tab-button"], {
            [styles.active]: activeTab === "todos",
          })}
          onClick={() => handleChangeTab("todos")}
        >
          Todos
        </button>
        <button
          className={classNames(styles["tab-button"], {
            [styles.active]: activeTab === "confirmados",
          })}
          onClick={() => handleChangeTab("confirmados")}
        >
          Confirmados
        </button>
        <button
          className={classNames(styles["tab-button"], {
            [styles.active]: activeTab === "nconfirmados",
          })}
          onClick={() => handleChangeTab("nconfirmados")}
        >
          Não Confirmados
        </button>
      </div>

      {props.guests !== undefined && props.guests.length > 0 && (
        <AllGuests reloadGuests={props.setReload} guests={guests} />
      )}
    </div>
  );
}
