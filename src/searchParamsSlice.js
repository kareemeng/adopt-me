import { createSlice } from "@reduxjs/toolkit";

export const searchParamsSlice = createSlice({
  name: "searchParams",
  initialState: {
    value: {
      location: "",
      animal: "",
      breed: "",
    },
  },
  reducers: {
    updateSearchParams: (state, action) => {
      state.value = action.payload;
    },
    //we can add more reducers here like setAnimal, setBreed, etc.
  },
});

export const { updateSearchParams } = searchParamsSlice.actions;
export default searchParamsSlice.reducer;
