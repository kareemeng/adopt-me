import { configureStore } from "@reduxjs/toolkit";
import adoptedPet from "./adoptedPetSlice";
import searchParams from "./searchParamsSlice";
import { petApi } from "./petApiService";

const store = configureStore({
  reducer: {
    adoptedPet,
    searchParams,
    [petApi.reducerPath]: petApi.reducer,
  },
  // Add the api middleware. just do it
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(petApi.middleware), //to cache the data and to make the api call
});

export default store;
