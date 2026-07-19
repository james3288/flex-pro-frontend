import { useMemo } from "react";
import useToastifyMessage from "../hooks/useToastifyMessage";

const useToastifyMessageComponent = () => {
  const message = () => {
    return (
      <p>
        <span
          style={{
            color: "green",
            fontWeight: "bold",
            fontFamily: "monospace",
          }}
        >
          No Camera found on this device.
        </span>
      </p>
    );
  };

  const { showToastMessage } = useToastifyMessage({
    message,
    position: "top-right",
  });

  return showToastMessage;
};

export default useToastifyMessageComponent;
