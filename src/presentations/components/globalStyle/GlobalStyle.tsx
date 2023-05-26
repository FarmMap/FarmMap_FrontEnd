// External files
import React from "react";

// Internal files
// Styles
import "./GlobalStyle.module.scss";

interface GlobalStyleProps {
  children: any;
}

const GlobalStyle: React.FC<GlobalStyleProps> = (props) => {
  const { children } = props;
  return children;
};

export default GlobalStyle;
