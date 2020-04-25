import React from "react";

interface GeneralLayoutProps {
  children: JSX.Element;
}

const GeneralLayout = ({ children }: GeneralLayoutProps) => {
  return (
    <div className={"outer-module"}>
      <div className={"inner-module"}>{children}</div>
    </div>
  );
};

export default GeneralLayout;
