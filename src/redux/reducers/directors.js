import { createSlice } from "@reduxjs/toolkit";

const directorsSlice = createSlice({
  name: "directors",
  initialState: {
    list: [],
    filter: "",
  },
  reducers: {
    setDirectors: (state, action) => {
      state.list = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { setDirectors, setFilter } = directorsSlice.actions;
export default directorsSlice.reducer;
