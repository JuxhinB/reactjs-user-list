import React from "react";
import { Route, Switch } from "react-router-dom";
import { UserListScreen } from "../module/userList/screen";

function GuestNavigation() {
  return (
    <Switch>
      <Route exact path="/" component={UserListScreen} />
      <Route exact path="/home" component={UserListScreen} />
    </Switch>
  );
}

export default GuestNavigation;
