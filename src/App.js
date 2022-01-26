import { useState } from "react";
import Webcam from "./components/Webcam";
import ImagePreviewer from "./components/ImagePreviewer";
import SlideShowPreviewer from "./components/SlideShowPreviewer";
import { upload, genDeliveryURL } from "./helpers";
import "./App.css";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [deliveryURL, setDeliveryURL] = useState("");
  const [images, setImages] = useState([]);
  const onCapture = (newImage) =>
    setImages((prevImages) => [...prevImages, newImage]);

  const deleteImage = (ind) =>
    setImages((prevImages) => images.filter((_, index) => index !== ind));

  const uploadMultipleImages = async (images) => {
    let arrOfImageIds = [];
    for (const image of images) {
      arrOfImageIds.push(await upload(image));
    }
    return arrOfImageIds;
  };

  const buildSlideShow = async () => {
    try {
      setLoading(true);
      const uploadedImgsPublicIds = await uploadMultipleImages(images);
      const deliveryURL = genDeliveryURL(uploadedImgsPublicIds);
      setDeliveryURL(deliveryURL);
      setImages([]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <section className="main con">
        <Webcam onCapture={onCapture} loading={loading} />
        {deliveryURL && <SlideShowPreviewer url={deliveryURL} />}
      </section>
      {images.length >= 2 && (
        <div>
          <button onClick={buildSlideShow} className="create_slide_btn">
            {loading ? "processing" : "generate slideshow"}
          </button>
        </div>
      )}

      <section className="captured_imags_con con">
        {images.map((imgURL, index) => (
          <ImagePreviewer
            url={imgURL}
            key={index}
            del={() => deleteImage(index)}
          />
        ))}
      </section>
    </main>
  );
}
