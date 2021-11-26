import React from "react";

const ImgComponent = ({ src, alt, className, style }) => {
  return <div className={className}><img src={src} alt={alt} style={style} /></div>;
};

export default ImgComponent;
