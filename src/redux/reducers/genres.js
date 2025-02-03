import { createSlice } from "@reduxjs/toolkit";

const genresSlice = createSlice({
  name: "genres",
  initialState: {
    list: [],
    filter: "",
  },
  reducers: {
    setGenres: (state, action) => {
      state.list = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { setGenres, setFilter } = genresSlice.actions;
export default genresSlice.reducer;
