import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "./store";
import SearchPet from "./SearchPet";
import Details from "./Details";

//React Query stored in a global variable to be used in the entire app ( stored in memory)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // this will make the data available till the session ends
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  //*BrowserRouter and QueryClientProvider are higher order components that will wrap the entire app but will not render anything
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <header>
            <Link to="/">Adopt Me!</Link>
          </header>
          <Routes>
            <Route path="/details/:id" element={<Details />} />
            <Route path="/" element={<SearchPet />} />
          </Routes>
        </Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
