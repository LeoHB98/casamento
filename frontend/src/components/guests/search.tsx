import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";

import { MembersData } from "../../models/invite/modal.interface";

import styles from "./search.module.css";

interface SearchInfProps {
  members: MembersData[];
  originaisMembers: MembersData[];
  setMembers: (inf: MembersData[]) => void;
}

export function Search({ originaisMembers, setMembers }: SearchInfProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value); // Atualiza o termo de busca
  }, []);

  const filteredMembers = useMemo(() => {
    if (searchTerm.trim() === "") {
      return originaisMembers; // Se o campo de busca estiver vazio, retorna todos os membros
    }

    return originaisMembers.filter((mem) => {
      return mem?.membros.some((m) =>
        m.nomeMembro?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [searchTerm, originaisMembers]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMembers(filteredMembers); // Atualiza o estado com membros filtrados
    }, 100);
    return () => clearTimeout(timer);
  }, [filteredMembers, setMembers]);

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Buscar convidado"
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
}
