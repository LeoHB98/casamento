import { useState } from "react";
import styles from "./dropdown.module.css";
import { SortAscending } from "phosphor-react";

interface DropdownBUttonUsers {
  setOption: (value: string) => void;
}
const DropdownButton = (props: DropdownBUttonUsers) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option: string) => {
    setIsOpen(false); // Fecha o dropdown após o clique
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
            className={styles.dropdownItem}
            onClick={() => handleOptionClick("a-z")}
          >
            Alfabetico A-Z
          </button>
          <button
            className={styles.dropdownItem}
            onClick={() => handleOptionClick("z-a")}
          >
            Alfabetico Z-A
          </button>
          <button
            className={styles.dropdownItem}
            onClick={() => handleOptionClick("last")}
          >
            Ult. Adc.
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
