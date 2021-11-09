import React from "react";
import ImgComponent from "./ImgComponent";
import HorlogeComponent from "./HorlogeComponent";
import NavbarComponent from "./NavbarComponent";

const HeaderComponent = (props) => {
  return (
    <header>
      <ImgComponent
        className="company-logo"
        src="../images/logo-fenbat-transparent.png"
      />
      <NavbarComponent props={props} />
      <HorlogeComponent />
    </header>
  );
};

export default HeaderComponent;
