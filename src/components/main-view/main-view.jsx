import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

const MainView = () => {
  const [movies, setMovies] = useState([
    {
      _id: 1,
      name: "Interstellar",
      genre: "Science Fiction",
      director: "Christopher Nolan",
      released: "2014",
      description:
        "A group of astronauts travel through a wormhole in search of a new home.",
      imagePath:
        "https://m.media-amazon.com/images/I/51do4AD66QL._SX300_SY300_QL70_ML2_.jpg",
    },
    {
      _id: 2,
      name: "Pulp Fiction",
      genre: "Crime",
      director: "Quentin Tarantino",
      released: "1994",
      description:
        "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
      imagePath: "https://m.media-amazon.com/images/I/81UTs3sC5hL._SY445_.jpg",
    },
    {
      _id: 3,
      name: "Titanic",
      genre: "Romance",
      director: "James Cameron",
      released: "1997",
      description:
        "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
      imagePath:
        "https://m.media-amazon.com/images/I/51cGF959UmL._SX300_SY300_QL70_ML2_.jpg",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  //Closes movie view
  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>No movies to display</div>;
  }

  //Renders movies and sets onclick listeners to open movie view
  return (
    <div>
      {movies.map((movie) => {
        return (
          <MovieCard
            key={movie._id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        );
      })}
    </div>
  );
};

export default MainView;
