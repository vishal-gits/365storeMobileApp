import * as React from "react";
import { StoreProvider } from "./globalstore/Store";
import GlobalStateProvider from "./globalstore/GlobalStateProvider";
import SplashLoader from "./components/SplashLoader";

const App = () => {
  return (
    <GlobalStateProvider>
      <SplashLoader />
    </GlobalStateProvider>
  );
};
export default App;
