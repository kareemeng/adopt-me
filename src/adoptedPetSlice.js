// a slice is a collection of reducers and actions for a specific feature of the app
// (act as bundle of everything related to a feature)
import { createSlice } from "@reduxjs/toolkit";

//the advantage of redux toolkit is that it allows you to mutate the state directly
// and it will be testable and predictable

export const adoptedPetSlice = createSlice({
  name: "adoptedPet",
  initialState: {
    value: null,
  },
  reducers: {
    //reducers are functions that take an old state and something to change it to
    // (take old state and preform an action on it to get new state)
    adopt: (state, action) => {
      //you can mutate the state directly in redux toolkit
      //for example, state.value = action.payload.name.toUpperCase();
      state.value = action.payload;
    },
    unadopt: (state) => {
      state.value = null;
    },
  },
});
//redux toolkit behind the scenes is using immer to make this possible
//export the actions

export const { adopt, unadopt } = adoptedPetSlice.actions; // this is the function that will be called in the component

/**
 * this is doing something similar to this:
 *export const adopt = (pet) => {
 *  return { type: "adoptedPet/adopt", payload: pet };
 *};
 */
//export the reducer
export default adoptedPetSlice.reducer;
