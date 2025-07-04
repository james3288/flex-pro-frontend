import React, { useEffect, useRef, useState } from "react";
import instance from "../../others/axiosInstance";

const useUserImageRegistration = () => {
  const webcamRef = useRef(null);
  const [url, setUrl] = useState(null);
  const [webcamActive, setWebcamActive] = useState(true);
  const [id, setId] = useState(0);
  const [capture, setCapture] = useState(false);
  const [register, setRegister] = useState(false);
  const [count, setCount] = useState(0);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    console.log("registered");
  }, [register]);

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
      const img = new Image();
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

  const saveUserInfo = async () => {
    const result = await instance
      .post("/api/save_users/", state)
      .then(function (response) {
        return response.data.id;
      })
      .catch(function (error) {
        console.log(error);
        return 0;
      });

    return result;
  };

  const saveUserImage = async (id) => {
    // Convert the image data to Base64
    const base64Image = await convertToBase64(url);
    const datas = { image: base64Image, id: id };

    const result = await instance
      .post("/api/save_image/", datas)
      .then(function (response) {
        console.log(response);
        return true;
      })
      .catch(function (error) {
        console.log(error);
        return false;
      });

    return result;
  };

  const handleSaveUserData = async () => {
    if (capture === true && url != null) {
      const saveuserinfo = await saveUserInfo();

      if (saveuserinfo > 0) {
        const saveuserimage = await saveUserImage(saveuserinfo);

        // if userinfo successfully registered, next is saving image
        if (saveuserimage == true) {
          setCount(0);
          setRegister(true);
          setMsg("User Successfully Registered");
        }
      } else {
        setMsg("There is is something wrong with your registration!");
      }
    }
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
  };
};

export default useUserImageRegistration;
