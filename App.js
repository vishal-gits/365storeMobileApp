import * as React from "react";
import { StoreProvider } from "./globalstore/Store";
import SplashLoader from "./components/SplashLoader";

const App = () => {
  return (
    <StoreProvider>
      <SplashLoader />
    </StoreProvider>
  );
};
export default App;
