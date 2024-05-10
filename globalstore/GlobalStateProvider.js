import { StoreProvider } from "./Store";
import { OrderProvider } from "./Order";
import { CustomerProvider } from "./Customer";

const GlobalStateProvider = ({ children }) => {
  return (
    <CustomerProvider>
      <StoreProvider>
        <OrderProvider>{children}</OrderProvider>
      </StoreProvider>
    </CustomerProvider>
  );
};
export default GlobalStateProvider;
