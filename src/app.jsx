import { useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchPet from "./SearchPet";
import Details from "./Details";
import AdoptedPetContext from "./adoptedPetContext";

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
  const adoptedPets = useState(null);
  //*BrowserRouter and QueryClientProvider are higher order components that will wrap the entire app but will not render anything
  return (
    <dir
      className="m-0 p-0 "
      style={{
        background: "url(https://pets-images.dev-apis.com/pets/wallpaperB.jpg)",
      }}
    >
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AdoptedPetContext.Provider value={adoptedPets}>
            <header className="mb-10 w-full bg-gradient-to-b from-yellow-400 via-orange-500 to-red-500 p-7 text-center">
              <Link className="text-6xl text-white hover:text-gray-200" to="/">
                Adopt Me!
              </Link>
            </header>
            <Routes>
              <Route path="/details/:id" element={<Details />} />
              <Route path="/" element={<SearchPet />} />
            </Routes>
          </AdoptedPetContext.Provider>
        </QueryClientProvider>
      </BrowserRouter>
    </dir>
  );
};
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
