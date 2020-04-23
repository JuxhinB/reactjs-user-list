import React from "react";
import { SwitchNavigation } from "../navigation";
import { UserProvider } from "../provider";

interface RootContainerProps {}

function RootContainer() {
  return (
    <UserProvider>
      <SwitchNavigation />
    </UserProvider>
  );
}

export default RootContainer;
