import { useEffect, useState } from "react";
import { MembersData } from "../../models/invite/modal.interface";
import { CloseButton } from "../invite/closeButton";
import Modal from "../invite/modal";
import styles from "./status.module.css";

import { ChartBar } from "phosphor-react";

interface StatusProps {
  setReload: (value: boolean) => void;
  guests: MembersData[];
}

export function Status(props: StatusProps) {
  const [loadStatus, setLoadStatus] = useState(false);
  const [totalMembers, setTotalMembers] = useState(Number);
  const [totalMembersConfirmed, setTotalMembersConfirmed] = useState(Number);

  const mCounts: string[] = []; // Inicialize como um array vazio com tipo correto
  const mCountsConfirmed: string[] = [];

  function handleOpenStatus() {
    props.setReload(true);
    setLoadStatus(true);
  }

  useEffect(() => {
    if (loadStatus) {
      props.guests.forEach((v) => {
        // console.log(v);
        v.membros.forEach((m) => {
          // console.log(m);
          if (m.nomeMembro) {
            mCounts.push(m.nomeMembro); // Adiciona o nome ao array

            if (m.confirmado === "Sim") {
              mCountsConfirmed.push(m.nomeMembro);
            }
          }
        });
      });
    }
    setTotalMembers(mCounts.length);
    setTotalMembersConfirmed(mCountsConfirmed.length);
  }, [loadStatus, props.guests, mCounts, mCountsConfirmed]);

  return (
    <div className={styles.box}>
      <button onClick={handleOpenStatus}>
        <ChartBar size={30} />
      </button>

      <Modal currentState={loadStatus}>
        <CloseButton setBoolean={setLoadStatus} />
        <div className={styles.container}>
          {props.guests && props.guests?.length > 0 && (
            <div className={styles.round}>
              Total familias/convites:
              <div className={styles.circle}>{props.guests?.length}</div>
            </div>
          )}

          {totalMembersConfirmed > 0 && (
            <div className={styles.round}>
              Total de participantes confirmados:
              <div className={styles.circle}>{totalMembersConfirmed}</div>
            </div>
          )}

          {totalMembersConfirmed > 0 && (
            <div className={styles.round}>
              Total de participantes nao confirmados:
              <div className={styles.circle}>
                {totalMembers - totalMembersConfirmed}
              </div>
            </div>
          )}

          {totalMembers > 0 && (
            <div className={styles.round}>
              Total de participantes cadastrados:
              <div className={styles.circle}>{totalMembers}</div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
