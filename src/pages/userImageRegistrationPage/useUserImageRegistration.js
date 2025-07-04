import React, { useEffect, useRef, useState } from "react";
import instance from "../../others/axiosInstance";
import useFormRegistrationStore from "../../store/useFormRegistrationStore";

const useUserImageRegistration = () => {
  const webcamRef = useRef(null);
  const [url, setUrl] = useState(null);
  const [webcamActive, setWebcamActive] = useState(true);
  const [id, setId] = useState(0);
  const [capture, setCapture] = useState(false);
  const [register, setRegister] = useState(false);
  const [count, setCount] = useState(0);
  const [msg, setMsg] = useState("");
  const { formData } = useFormRegistrationStore();


  const capturePhoto = React.useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapture(true);
    setUrl(imageSrc);
  }, [webcamRef]);

  const refreshCapture = () => {
    setUrl(null);
    setCapture(false);
  };

  const startMyCamera = () => {
    setWebcamActive(true);
  };

  const stopMyCamera = () => {
    let stream = webcamRef.current.stream;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());

    setWebcamActive(false);
  };

  const convertToBase64 = async (imageSrc) => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL("image/png");
        resolve(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
      };
      img.onerror = (error) => reject(error);
      img.src = imageSrc;
    });
  };

  // Save user info using formData from Zustand
  const saveUserInfo = async () => {
    try {
      console.log(formData);
      const response = await instance.post("/api/save_users/", formData);
      return response.data.id;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  // Save user image using the returned user id
  const saveUserImage = async (id) => {
    try {
      const base64Image = await convertToBase64(url);
      const datas = { image: base64Image, id: id };
      await instance.post("/api/save_image/", datas);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  // Main save handler
  const handleSaveUserData = async () => {
    alert("Button clicked!");
    if (capture === true && url != null) {
      const saveuserinfo = await saveUserInfo();

      if (saveuserinfo > 0) {
        const saveuserimage = await saveUserImage(saveuserinfo);

        if (saveuserimage === true) {
          setCount(0);
          setRegister(true);
          setMsg("User Successfully Registered");
        }
      } else {
        setMsg("There is is something wrong with your registration!");
      }
    } else {
      setCount((prev) => prev + 1);
    }
  };

  const isFormDataValid = () => {
    if (!formData) return false;
    // Check all required fields
    return (
      formData.name &&
      formData.weights &&
      formData.contact_number &&
      formData.contact_number_ioe &&
      Array.isArray(formData.agreements) &&
      formData.agreements.length > 0 &&
      url
    );
  };
  return {
    webcamRef,
    url,
    webcamActive,
    id,
    setId,
    capture,
    setCapture,
    register,
    setRegister,
    count,
    setCount,
    msg,
    setMsg,
    capturePhoto,
    refreshCapture,
    startMyCamera,
    stopMyCamera,
    convertToBase64,
    handleSaveUserData,
    isFormDataValid,
  };
};

export default useUserImageRegistration;
