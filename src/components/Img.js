import React, { useState } from "react";

export default function Img(props) {
  const [url, setUrl] = useState(props.src);
  const handleImageErrored = function () {
    setUrl("http://kingsman96.top/upload/images/default.png");
  };
  return (
    <div style={props.style} className="img-box">
      <img src={url} onError={handleImageErrored} />
    </div>
  );
}
