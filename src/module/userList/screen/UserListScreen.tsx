import React, { useContext, useEffect, useState } from "react";
import { GeneralLayout } from "../../../layouts";
import { fetchApi, handleResponse } from "../../../config/core";
import { AxiosResponse } from "axios";
import { UserResponse, UserInfo } from "../../../Types";
import { toast } from "react-toastify";
import strLng from "../../../config/localization/strLng";
import { UserContext } from "../../../provider/UserProvider";
import comp from "../component";

let pagesDOM: number = 1;
let currentPageDOM: number = 1;

let scrolledToBottomTimer: any = 0;

function UserListScreen(): JSX.Element {
  const { setIsLoading } = useContext(UserContext);

  const [users, setUsers] = useState<UserInfo[] | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    document.addEventListener("scroll", handleScroll);
    return function cleanUp() {
      document.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let tempUsers = users ? users : [];
    fetchUsers(`?page=${currentPage}`, tempUsers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  function fetchUsers(page = "", prevUsers: any = []) {
    if (setIsLoading) setIsLoading(true);
    fetchApi({
      url: `/users${page}`,
    })
      .then((r: AxiosResponse<UserResponse>) => {
        console.log(r);
        if (handleResponse(r) === true) {
          setUsers(prevUsers.concat(r.data.data));
          pagesDOM = r.data.total_pages;
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
        setIsLoading(false);
      });
  }

  function handleScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      if (scrolledToBottomTimer) clearTimeout(scrolledToBottomTimer);
      scrolledToBottomTimer = setTimeout(() => {
        handleLoadMore();
      }, 1000);
    }
  }

  function handleLoadMore() {
    if (currentPageDOM < pagesDOM) {
      currentPageDOM++;
      setCurrentPage(currentPageDOM);
    } else {
      toast.info(strLng.MESSAGE.no_more_users_to_load);
    }
  }

  return (
    <GeneralLayout>
      <>
        <p className={"section-title"}>{strLng.LABEL.users}</p>
        {users ? (
          <>
            <div
              style={!shouldResize() ? { marginBottom: 15 } : {}}
              className={"user-info-wrap"}
            >
              {users.map((user, index) => (
                <comp.User key={`${user.id}-${index}`} {...user} />
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
