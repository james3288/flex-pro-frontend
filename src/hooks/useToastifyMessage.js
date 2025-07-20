import { toast } from "react-toastify";

const useToastifyMessage = ({ message, position }) => {
  const showToastMessage = () => {
    toast.error(message, {
      position: position,
      autoClose: false,
    });
  };
  return { showToastMessage };
};

export default useToastifyMessage;
