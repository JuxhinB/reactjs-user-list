import React, { useEffect, useState } from "react";
import { UserInfo } from "../../../Types";
import strLng from "../../../config/localization/strLng";

interface LoadMoreButtonProps {
  users: UserInfo[];
  shouldResize: () => boolean;
  loadMore: () => void;
}

function LoadMoreButton({
  users,
  shouldResize,
  loadMore,
}: LoadMoreButtonProps): JSX.Element {
  const [shouldRender, setShouldRender] = useState<boolean>(false);

  useEffect(() => {
    if (shouldResize()) {
      setShouldRender(true);
    } else {
      setShouldRender(false);
    }
  }, [users]);

  return shouldRender ? (
    <div className={"bottom-action"}>
      <button className={"btn"} onClick={loadMore}>
        {strLng.ACTION.load_more}
      </button>
    </div>
  ) : (
    <></>
  );
}

export default LoadMoreButton;
