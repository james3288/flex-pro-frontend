import { toast } from "react-toastify";

const useToastifyMessage = ({ message, position }) => {
  const showToastMessage = () => {
    toast.error(message, {
      position: position,
      autoClose: true,
    });
  };
  return { showToastMessage };
};

export default useToastifyMessage;
