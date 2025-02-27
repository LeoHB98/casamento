import { X } from "phosphor-react";
import styles from "./closeButton.module.css";

interface CloseButtonProps {
  setObjetct?: (value: object) => void;
  setStringArray?: (value: string[]) => void;
  setBoolean?: (value: boolean) => void;
  invertBool?: (value: boolean) => void;
  setNullString?: (value: string) => void;
}

export function CloseButton(props: CloseButtonProps) {
  function close() {
    if (props.setBoolean !== undefined) {
      props.setBoolean(false);
    }

    // if (props.invertBool !== undefined) {
    //   props.invertBool((prev: boolean) => !prev);
    // }

    if (props.setObjetct !== undefined) {
      props.setObjetct({});
    }

    if (props.setStringArray !== undefined) {
      props.setStringArray([]);
    }

    if (props.setNullString !== undefined) {
      props.setNullString("");
    }
  }

  return (
    <div className={styles.close}>
      <button onClick={close}>
        <X size={20} />
      </button>
    </div>
  );
}
