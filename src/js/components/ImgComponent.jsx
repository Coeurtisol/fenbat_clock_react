import React from "react";

const ImgComponent = ({ src, alt, className, style, dataTestId }) => {
  return <div className={className}><img src={src} alt={alt} style={style} data-testid={dataTestId} /></div>;
};

export default ImgComponent;
