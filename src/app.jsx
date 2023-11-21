import { useState, lazy, Suspense } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdoptedPetContext from "./adoptedPetContext";
//making app a general component that will be used in both the server and/or the client side

//Lazy is a higher order component that will only render the component when it is needed
const Details = lazy(() => import("./Details"));
const SearchPet = lazy(() => import("./SearchPet"));

//React Query stored in a global variable to be used in the entire app ( stored in memory)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // this will make the data available till the session ends
      staleTime: Infinity,
      cacheTime: Infinity,
      suspense: true,
    },
  },
});

const App = () => {
  const adoptedPets = useState(null);
  //*BrowserRouter and QueryClientProvider are higher order components that will wrap the entire app but will not render anything
  return (
    <QueryClientProvider client={queryClient}>
      <AdoptedPetContext.Provider value={adoptedPets}>
        {/* suspense is a higher order component that will render a fallback component while the lazy component is loading */}
        <Suspense
          fallback={
            <div className="loading-pane">
              <h2 className="loader">🐶</h2>
            </div>
          }
        >
          <header>
            <Link to="/">Adopt Me!</Link>
          </header>
          <Routes>
            <Route path="/details/:id" element={<Details />} />
            <Route path="/" element={<SearchPet />} />
          </Routes>
        </Suspense>
      </AdoptedPetContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
