import React, { useContext, useEffect, useState } from "react";
import { GeneralLayout } from "../../../layouts";
import { fetchApi, handleResponse } from "../../../config/core";
import { AxiosResponse } from "axios";
import { UserResponse, UserInfo } from "../../../Types";
import { toast } from "react-toastify";
import strLng from "../../../config/localization/strLng";
import { UserContext } from "../../../provider/UserProvider";
import comp from "../component";
import LoadMoreButton from "../component/LoadMoreButton";

let scrolledToBottomTimer: any = 0;

function UserListScreen(): JSX.Element {
  const { setIsLoading } = useContext(UserContext);

  const [users, setUsers] = useState<UserInfo[] | null>(null);
  const [pages, setPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    fetchUsers(`?page=${currentPage}`);
    document.addEventListener("scroll", handleScroll);
    return function cleanUp() {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (users && users.length) {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }, [users]);

  function handleScroll(event: Event) {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      if (scrolledToBottomTimer) clearTimeout(scrolledToBottomTimer);
      scrolledToBottomTimer = setTimeout(() => {
        console.log("At The Bottom"); //Add in what you want here
      }, 500);
    }
  }

  function fetchUsers(page = "") {
    setIsLoading(true);
    fetchApi({
      url: `/users${page}`,
    })
      .then((r: AxiosResponse<UserResponse>) => {
        console.log(r);
        if (handleResponse(r) === true) {
          setUsers(r.data.data);
          setPages(r.data.total_pages);
        } else {
          toast.warn(strLng.ERROR.something_went_wrong);
        }
      })
      .catch(e => {
        console.log(e);
        toast.error(strLng.ERROR.something_went_wrong);
      })
      .finally(() => {
        toast.info(strLng.MESSAGE.users_fetch_success);
      });
  }

  function handleLoadMore() {}

  return (
    <GeneralLayout>
      <>
        <p className={"section-title"}>{strLng.LABEL.users}</p>
        {users ? (
          <>
            <div className={"user-info-wrap"}>
              {users.map(user => (
                <comp.User key={`${user.id}`} {...user} />
              ))}
            </div>
            <comp.LoadMoreButton
              users={users}
              shouldResize={shouldResize}
              loadMore={handleLoadMore}
            />
          </>
        ) : (
          <div />
        )}
      </>
    </GeneralLayout>
  );
}

export default UserListScreen;

function shouldResize(): boolean {
  if (window.innerHeight >= document.documentElement.offsetHeight) {
    return true;
  }
  return false;
}
