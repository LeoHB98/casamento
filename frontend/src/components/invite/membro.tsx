import { useState } from "react";
import { MembersData } from "../../models/invite/modal.interface";
import styles from "./membro.module.css";
import { CloseButton } from "./closeButton";

// import { CheckCircle, Circle } from 'phosphor-react'

interface MembrosProps {
  family: MembersData;
  setMembers: (value: MembersData) => void;
  setOpenMembersModal: (value: boolean) => void;
  setMembersSelected: (value: string[]) => void;
}

interface MembroProps {
  membro: string;
  membros: string[];
  setMembersSelected: (value: string[]) => void;
}

interface MProps {
  membro: string;
}

export function Membros(props: MembrosProps) {
  const [members, setMembers] = useState<string[]>([]);

  function handleMessageMembers() {
    props.setOpenMembersModal(false);
    props.setMembersSelected(members);
    props.setMembers({} as MembersData);
  }

  function handleCleanMembers() {
    setMembers([]);
    props.setMembers({} as MembersData);
  }

  return (
    <div className={styles.container}>
      <CloseButton
        setBoolean={props.setOpenMembersModal}
        setObjetct={handleCleanMembers}
        setStringArray={props.setMembersSelected}
      />

      <h3>Selecione todos aqueles que participarão evento:</h3>

      <div className={styles.membersContainer}>
        {props.family.membros?.map((member) => (
          <>
            {member.nomeMembro !== undefined && (
              <Membro
                key={member.id}
                membro={member.nomeMembro}
                membros={members}
                setMembersSelected={setMembers}
              />
            )}
          </>
        ))}
      </div>

      {members.length > 0 ? (
        <p>Você selecionou:</p>
      ) : (
        <p>Você não selecionou ninguém ainda 😔</p>
      )}

      <div className={styles.membersSelected}>
        {members?.map((member) => (
          <MemberSelected membro={member} />
        ))}
      </div>

      {members.length > 0 && (
        <div className={styles.send}>
          <button onClick={handleMessageMembers}>Enviar</button>
        </div>
      )}
    </div>
  );
}

function MemberSelected({ membro }: MProps) {
  return <div className={styles.mem}>{` ${membro}`}</div>;
}

function Membro(props: MembroProps) {
  const [memberSelected, setMemberSelected] = useState(false);

  function SetMember() {
    setMemberSelected(!memberSelected);

    let updateMemberSelected: string[] = [...props.membros];

    if (!memberSelected) {
      updateMemberSelected = [...updateMemberSelected, props.membro];
    } else {
      updateMemberSelected = updateMemberSelected.filter(
        (member) => member !== props.membro
      );
    }

    props.setMembersSelected(updateMemberSelected);
  }

  return (
    <div className={styles.memberContainer}>
      <div
        className={`${memberSelected ? styles.checkedButton : styles.toCheck}`}
      >
        <button onClick={SetMember}>
          <p>{props.membro}</p>
        </button>
      </div>
    </div>
  );
}
