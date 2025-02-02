import { createSlice } from "@reduxjs/toolkit";

const actorsSlice = createSlice({
  name: "directors",
  initialState: {
    list: [],
    filter: "",
  },
  reducers: {
    setActors: (state, action) => {
      state.list = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { setActors, setFilter } = actorsSlice.actions;
export default actorsSlice.reducer;
