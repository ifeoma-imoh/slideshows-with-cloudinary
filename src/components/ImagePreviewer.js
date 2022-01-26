const ImagePreviewer = ({ url, del }) => {
  return (
    <figure className="single_img">
      <img src={url} alt={`captures`} />
      <button className="btn_red" onClick={del}>
        Delete
      </button>
    </figure>
  );
};
export default ImagePreviewer;
