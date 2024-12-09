import { MessageProps } from "../../models/message";

export const WhatsAppShareButton = (props: MessageProps) => {
  const handleShare = () => {
    const message = props.message;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <button onClick={handleShare}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="white"
        width="20px"
        height="20px"
      >
        <path d="M12 0C5.37 0 0 5.37 0 12c0 2.11.54 4.16 1.56 6.03L.06 24l5.12-1.34C7.88 23.46 9.93 24 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0zm0 22c-2.01 0-3.97-.52-5.68-1.5l-.4-.23-3.02.79.81-2.94-.26-.43A9.8 9.8 0 0 1 2 12C2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10zm5.27-7.5c-.29-.15-1.71-.85-1.98-.95-.27-.1-.47-.14-.67.15s-.77.95-.95 1.14-.35.23-.65.08a8.34 8.34 0 0 1-2.44-1.5c-.9-.9-1.5-2-1.67-2.34-.17-.33-.02-.51.13-.67.14-.14.29-.33.43-.5.14-.16.19-.27.29-.46.1-.19.05-.36-.02-.5-.07-.14-.67-1.61-.92-2.22s-.47-.5-.65-.51h-.55c-.18 0-.47.06-.72.33s-.94.92-.94 2.24 1.02 2.59 1.16 2.77c.14.18 1.95 2.97 4.74 4.18.66.29 1.18.46 1.58.59.66.21 1.26.18 1.74.11.53-.08 1.71-.7 1.95-1.38.24-.67.24-1.24.17-1.37-.07-.13-.26-.21-.55-.36z" />
      </svg>
    </button>
  );
};
