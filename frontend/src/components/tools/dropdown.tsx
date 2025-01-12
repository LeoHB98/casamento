import { useState } from "react";
import styles from "./dropdown.module.css";
import { SortAscending } from "phosphor-react";
import classNames from "classnames";

interface DropdownBUttonUsers {
  setOption: (value: string) => void;
}
const Ordenation = (props: DropdownBUttonUsers) => {
  const [activeTab, setActiveTab] = useState<string>("");

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option: string) => {
    setIsOpen(false); // Fecha o dropdown após o clique
    setActiveTab(option); // Atualiza a opção ativa no componente pai
    props.setOption(option);
  };

  return (
    <div className={styles.dropdown}>
      {/* Botão principal com flecha */}
      <button onClick={toggleDropdown} className={styles.mainButton}>
        {/* <span className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ""}`}>
          ▶
        </span> */}
        <SortAscending size={30} />
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          <button
            className={classNames(styles["dropdown"], {
              [styles.active]: activeTab === "a-z",
            })}
            onClick={() => handleOptionClick("a-z")}
          >
            Alfabetico A-Z
          </button>
          <button
            className={classNames(styles["dropdown"], {
              [styles.active]: activeTab === "z-a",
            })}
            onClick={() => handleOptionClick("z-a")}
          >
            Alfabetico Z-A
          </button>
          <button
            className={classNames(styles["dropdown"], {
              [styles.active]: activeTab === "last",
            })}
            onClick={() => handleOptionClick("last")}
          >
            Ult. Adc.
          </button>
        </div>
      )}
    </div>
  );
};

export default Ordenation;
