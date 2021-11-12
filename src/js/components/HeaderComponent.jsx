import React, { useContext } from "react";
import ImgComponent from "./ImgComponent";
import HorlogeComponent from "./HorlogeComponent";
import NavbarComponent from "./NavbarComponent";
import AuthContext from "../../js/contexts/AuthContext";

const HeaderComponent = (props) => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <header>
      <ImgComponent
        className="company-logo"
        src="../images/logo-fenbat-transparent.png"
      />
      {isAuthenticated && <NavbarComponent props={props} />}
      <HorlogeComponent />
    </header>
  );
};

export default HeaderComponent;
