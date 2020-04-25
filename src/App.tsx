import React from "react";
import RootContainer from "./module/RootContainer";
import { hot } from 'react-hot-loader/root'

interface AppProps {}

function App() {
  return (
    <div className="">
      <RootContainer />
    </div>
  );
}

export default process.env.NODE_ENV === "development" ? hot(App) : App
