import { QueryClient, QueryClientProvider } from "react-query";
import Router from "./shared/Router";
import GlobalStyle from "./styles/GlobalStyle";
import { Provider } from "react-redux";
import store from "./redux/config/configStore";

const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <GlobalStyle />
        <Router />
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
