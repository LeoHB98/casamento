import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import styles from "./login.module.css";
import { Header } from "../models/header";
import { Api } from "../api/api";
import { GenericError } from "../components/tools/genericError";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

export default function Login() {
  const [pass, setPass] = useState("");
  const [username, setUsername] = useState("");

  const [send, setSend] = useState(false);

  const [hasError, setHasError] = useState(false);
  const [mgmError, setMgmErro] = useState("");

  function onChangeUsername(event: ChangeEvent<HTMLInputElement>) {
    const u = event.target.value;
    setUsername(u);
  }

  const navigate = useNavigate();
  function goTo(route: string) {
    navigate(`/${route}`);
  }

  function onChangePassword(event: ChangeEvent<HTMLInputElement>) {
    const p = event.target.value;
    setPass(p);
  }

  const fecthGetLogin = useCallback(async () => {
    if (send) {
      try {
        const response = await Api.login(username, pass);
        if (response && response.code === 200) {
          goTo(`noivos`);
        }
      } catch (err) {
        console.log(err);
        setHasError(true);

        if (err instanceof AxiosError) {
          const dataErr = err.response?.data;

          if (dataErr.code === 404) {
            setMgmErro(dataErr.message);
          }
        } else {
          // Caso o erro não seja do tipo esperado
          setMgmErro("Um erro inesperado ocorreu.");
        }

        setUsername("");
        setPass("");
      } finally {
        setSend(false);
      }
    }
  }, [send, username, pass, goTo]);

  useEffect(() => {
    fecthGetLogin();

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = ""; // Requerido para que a mensagem padrão apareça
      goTo("*");
    };

    // Adiciona o listener ao montar o componente
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Remove o listener ao desmontar o componente
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [username, pass, fecthGetLogin]);

  function handleSendLogin(event: FormEvent) {
    event.preventDefault();
    setSend(true);
  }

  return (
    <>
      <Header middle="" toPage="" hasAdd={false} />

      <div className={styles.box}>
        <form className={styles.container} onSubmit={handleSendLogin}>
          <div>
            <p>Usuário</p>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Digite o nome de usuário"
              value={username}
              onChange={onChangeUsername}
            />
          </div>

          <div>
            <p>Senha</p>

            <input
              type="password"
              id="password"
              placeholder="Digite a senha"
              name="password"
              value={pass}
              onChange={onChangePassword}
            />
          </div>
          <button type="submit">Entrar</button>
        </form>
        {hasError ? (
          <GenericError
            ErrorMessage={mgmError}
            SetCloseWindow={setHasError}
            closeWindow={hasError}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
