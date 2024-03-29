import React, { useContext } from "react";
import ImgComponent from "./ImgComponent";
import HorlogeComponent from "./HorlogeComponent";
import NavbarComponent from "./NavbarComponent";
import AuthContext from "../../js/contexts/AuthContext";

const HeaderComponent = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <header>
      <ImgComponent
        alt="logo fenbat"
        dataTestId="app-logo"
        className="company-logo m-1"
        src="../images/logo-fenbat-transparent.png"
      />
      {isAuthenticated && <NavbarComponent />}
      <HorlogeComponent />
    </header>
  );
};

export default HeaderComponent;
