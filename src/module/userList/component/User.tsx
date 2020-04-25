import React from "react";
import { UserInfo } from "../../../Types";

interface UserProps extends UserInfo {}

function User({ first_name, last_name, avatar }: UserProps): JSX.Element {
  return (
    <div className={"user-info"}>
      <img className={"user-info-img"} src={avatar} alt="" />
      <p className={"user-info-name"}>{`${first_name} ${last_name}`}</p>
    </div>
  );
}

export default User;
