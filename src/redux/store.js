import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./reducers/movies";
import actorsReducer from "./reducers/actors";
import userReducer from "./reducers/user/user";
import directorsReducer from "./reducers/directors";
import genresReducer from "./reducers/genres";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    actors: actorsReducer,
    directors: directorsReducer,
    genres: genresReducer,
    user: userReducer,
  },
});
