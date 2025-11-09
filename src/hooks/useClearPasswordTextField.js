import { useClearCredentialTextField } from "../store/useClearCredentialTextField";

const useClearPasswordTextField = () => {
  const [cSetIsClear] = useClearCredentialTextField((state) => [
    state.setIsClear,
  ]);

  const clearPasswordTextField = () => {
    cSetIsClear(true);
  };
  return { clearPasswordTextField };
};

export default useClearPasswordTextField;
