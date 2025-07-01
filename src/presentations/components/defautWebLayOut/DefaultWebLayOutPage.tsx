import React from "react";
import HeaderPage from "../header/HeaderPage";
import FooterPage from "../footer/FooterPage";

interface DefaultWebLayOutPageProps {
  children: React.ReactElement;
}

const DefaultWebLayOutPage: React.FC<DefaultWebLayOutPageProps> = ({
  children,
}) => {
  return (
    <div>
      <HeaderPage />
      <div>{children}</div>
      <FooterPage />
    </div>
  );
};

export default DefaultWebLayOutPage;
