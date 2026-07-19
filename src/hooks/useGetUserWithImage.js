import React, { useEffect, useState } from "react";
import getImagePath from "../getData/getImagePath";
import loadImageData from "../getData/loadImageData";

const useGetUserWithImage = ({ userId }) => {
  const [userFound, setUserFound] = useState(null);
  useEffect(() => {
    const userWithImg = async () => {
      console.log(userId);
      let imgData = await getImagePath(userId);

      const imageDataUrl = await loadImageData(imgData?.image1);
      let newImgData = { ...imgData, image: imageDataUrl };
      setUserFound(newImgData);
    };

    if (!userId === 0) {
      userWithImg();
    }

    // trainer
  }, [userId]);

  return { userFoundFromHook: userFound };
};

export default useGetUserWithImage;
