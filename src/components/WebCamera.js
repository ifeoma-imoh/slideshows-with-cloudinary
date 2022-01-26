import Webcam from "react-webcam";
import { useRef } from "react";

const WebCamera = ({ onCapture, loading }) => {
  const capture = async () => {
    // get screenshot
    const image = webCamRef.current.getScreenshot();
    onCapture(image);
  };
  const webCamRef = useRef();
  const videoConstraints = {
    width: 500,
    height: 400,
    facingMode: "user",
  };

  return (
    <article className="media_box">
      {/* web cam */}

      <Webcam
        audio={false}
        height={400}
        ref={webCamRef}
        screenshotFormat="image/jpeg"
        width={600}
        videoConstraints={videoConstraints}
      />
      <button
        disabled={loading}
        onClick={capture}
        className={"capture_btn"}
      ></button>
    </article>
  );
};

export default WebCamera;
