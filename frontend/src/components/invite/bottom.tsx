import { useNavigate } from "react-router-dom";
import styles from "./bottom.module.css";
import Header from "./header";

export function Bottom() {
  const navigate = useNavigate();

  const goTo = (value: string) => {
    navigate(`/${value}`);
  };

  return (
    <div className={styles.container}>
      <Header />
      <button onClick={() => goTo("login")}>Àrea Noivos</button>
    </div>
  );
}
