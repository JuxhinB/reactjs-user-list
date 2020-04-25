import React, { useContext, useEffect, useState } from "react";
import { GeneralLayout } from "../../../layouts";
import { fetchApi, handleResponse } from "../../../config/core";
import { AxiosResponse } from "axios";
import { UserResponse, UserInfo } from "../../../Types";
import { toast } from "react-toastify";
import strLng from "../../../config/localization/strLng";
import { UserContext } from "../../../provider/UserProvider";

function UserListScreen() {

  const { setIsLoading } = useContext(UserContext);

  const [users, setUsers] = useState<UserInfo[] | null>(null);
  const [pages, setPages] = useState<number | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    fetchUsers();
  }, []);

  function fetchUsers(page = "") {
    fetchApi({
      url: `/users${page}`,
    }).then(
      (r: AxiosResponse<UserResponse>) => {
        console.log(r);
        if (handleResponse(r) === true) {
          setUsers(r.data.data);
          setPages(r.data.total_pages);
        } else {
          toast.warn(strLng.ERROR.something_went_wrong);
        }
      },
    ).catch(
      (e) => {
        console.log(e);
        toast.error(strLng.ERROR.something_went_wrong);
      },
    ).finally(
      () => {
        toast.info(strLng.MESSAGE.users_fetch_success);
      },
    );
  }

  return (
    <GeneralLayout>
      <div className={""}>
      </div>
    </GeneralLayout>
  );
}

export default UserListScreen;
