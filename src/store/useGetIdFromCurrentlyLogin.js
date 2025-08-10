
import { useCurrentlyLoginStore } from "../components/face-scanner/store/currentlyLoginStore";

const useGetIdFromCurrentlyLogin = () => {
  const [cCurrentlyLogin] = useCurrentlyLoginStore((state) => [
    state.currentlyLogin,
  ]);

  const flexProUserId = cCurrentlyLogin?.usersubscription?.flexprouser?.id || 0;

  return { flexProUserId };
};

export default useGetIdFromCurrentlyLogin;
