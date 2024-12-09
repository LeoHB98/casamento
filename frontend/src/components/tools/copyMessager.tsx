import { Copy } from "phosphor-react";
import { MessageProps } from "../../models/message";

export const CopiableArea = (props: MessageProps) => {
  const message = props.message;

  const handleCopyAndShare = () => {
    navigator.clipboard.writeText(message).then(() => {
      alert("Mensagem copiada! Agora você pode colar em qualquer lugar!");
    });
  };

  return (
    <button onClick={handleCopyAndShare}>
      <Copy size={25} color="white" />
    </button>
  );
};
