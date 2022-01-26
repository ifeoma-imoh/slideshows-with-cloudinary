import axios from "axios";

const cloudName = "ifeomaimoh";

const upload = async (imgFileB64) => {
  const imageData = new FormData();
  imageData.append("file", imgFileB64);
  imageData.append("upload_preset", "testpreset");
  const res = await axios.post(
    ` https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    imageData
  );
  const imageDetails = res.data;
  return imageDetails.public_id;
};

const genDeliveryURL = (arrOfAsetIds) => {
  const templateID = "slideshow_i2o0w9_a1hyoq";
  const globalSettings = `w_500;h_500;du_10`;
  const slideSettings = `tdur_1500;transition_s:InvertedPageCurl`;

  const individualSlides = arrOfAsetIds
    .map((id) => "(media_i:" + id + ")")
    .join(";");

  return `https://res.cloudinary.com/${cloudName}/video/upload/fn_render:${globalSettings};vars_(${slideSettings};slides_(${individualSlides}))/${templateID}.mp4`;
};

export { upload, genDeliveryURL };
