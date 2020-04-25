import React from "react";

function Loader() {
  return (
    <div className={"loader-wrap"}>
      <div className={"loader"}>
        <div className={"loader-inner ball-scale-multiple"}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
