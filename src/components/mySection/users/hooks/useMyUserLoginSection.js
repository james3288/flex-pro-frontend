import { useEffect, useState } from "react";
import { useDayPassStore } from "../../../../store/useDayPassStore";
import { useUserStore } from "../../../../store/useUserStore";
import useGetUserWithImage from "../../../../hooks/useGetUserWithImage";
import Pic from "../../../../assets/img/dummy.png";

const useMyUserLoginSection = () => {
  const [play, setPlay] = useState(false);
  const [stop, setStop] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [userId, setUserId] = useState(0);
  const [userFoundWithImage, setUserFoundWithImage] = useState();
  const [userFound, setUserFound] = useState();
  const [isOnGoing, setIsOnGoing] = useState();
  const [isExpired, setIsExpired] = useState();
  const [trainers, setTrainers] = useState();
  const [isLogin, setIsLogin] = useState(false);
  const cUser = useUserStore((state) => state.user);
  const [dayPassLogin, setDayPassLogin] = useState(false);
  const [subscriptionRecord, setSubscriptionRecord] = useState({});
  const [totalFreeTrainerLeft, setTotalFreeTrainerLeft] = useState(0);

  //getter for dayPassStore
  const {
    isLogin: islogin2,
    dayPassName,
    isAlreadyLogin,
    remainingHours,
    personalTrainer,
    subscriptionName,
  } = useDayPassStore((state) => ({
    isLogin: state.isLogin,
    dayPassName: state.dayPassName,
    isAlreadyLogin: state.isAlreadyLogin,
    remainingHours: state.remainingHours,
    personalTrainer: state.personalTrainer,
    subscriptionName: state.subscriptionName,
  }));

  //getter for userStore
  const {
    trainersRemainingDays: cTrainersRemainingDays,
    sessionDays: cSessionDays,
    extendedTrainer: cExtendedTrainer,
    dateSubscribed: cDateSubscribed,
  } = useUserStore((state) => ({
    trainersRemainingDays: state.trainersRemainingDays,
    sessionDays: state.sessionDays,
    extendedTrainer: state.extendedTrainer,
    dateSubscribed: state.dateSubscribed,
  }));

  //setter for dayPassStore
  const { setDayPassUserId, setModalTitle, setIsAlreadyLogin, setIsLogin2 } =
    useDayPassStore((state) => ({
      setDayPassUserId: state.setDayPassUserId,
      setModalTitle: state.setModalTitle,
      setIsAlreadyLogin: state.setIsAlreadyLogin,
      setIsLogin2: state.setIsLogin,
    }));

  // const setIsLogin2 = useDayPassStore((state) => state.setIsLogin);

  const handlePlayClick = () => {
    setPlay(() => !play);
    setDisableBtn(true);
  };

  const handleStopClick = () => {
    // setPlay(() => !play);
    setStop(() => !stop);
  };

  const handleRefresh = () => {
    setUserId(0);
    setIsOnGoing("");
    setIsAlreadyLogin(false);
    setIsLogin2(false);
  };

  const handleDayPassLoginClick = async ({ resetRegularUserLogin }) => {
    await setDayPassUserId("daypass-login-modal");
    await setModalTitle("Daypass Login");

    resetRegularUserLogin();
  };

  // props
  const props = {
    userFoundWithImage: userFoundWithImage,
    cUser: cUser,
    cTrainersRemainingDays: cTrainersRemainingDays,
    cSessionDays: cSessionDays,
    cExtendedTrainer: cExtendedTrainer,
    cDateSubscribed: cDateSubscribed,
    totalFreeTrainerLeft: totalFreeTrainerLeft,
    setTotalFreeTrainerLeft: setTotalFreeTrainerLeft,
    handleRefresh: handleRefresh,
    isOnGoing: isOnGoing,
    subscriptionRecord: subscriptionRecord,
  };

  // daypass props
  const daypassProps = {
    pic: Pic,
    isOnGoing: isOnGoing,
    dayPassName: dayPassName,
    personalTrainer: personalTrainer,
    handleRefresh: handleRefresh,
    remainingHours: remainingHours,
    subscriptionName: subscriptionName,
  };

  const { userFoundFromHook } = useGetUserWithImage({ userId });

  useEffect(() => {
    setUserFoundWithImage(userFoundFromHook);
  }, [userFoundFromHook]);

  return {
    setPlay,
    setUserId,
    setUserFound,
    setIsOnGoing,
    setIsLogin,
    setTrainers,
    setIsExpired,
    setSubscriptionRecord,
    handlePlayClick,
    handleDayPassLoginClick,
    setDayPassLogin,
    disableBtn,
    play,
    stop,
    isLogin,
    isOnGoing,
    props,
    userId,
    dayPassLogin,
    isAlreadyLogin,
    daypassProps,
  };
};

export default useMyUserLoginSection;
