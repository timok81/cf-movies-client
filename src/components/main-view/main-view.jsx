import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://moviemovie-7703363b92cb.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((obj) => {
          return {
            id: obj._id,
            name: obj.Name,
            image: null,
            director: obj.Director.Name,
            genre: obj.Genre.Name,
            released: obj.Released,
            actors: obj.Actors.map((actor) => {
              return actor.Name;
            }),
            description: obj.Description,
          };
        });
        setMovies(moviesFromApi);
      });
  }, []);

  //Opens movie view
  if (selectedMovie) {
    let similarMovies = movies.filter((movie) => {
      return (
        movie.genre == selectedMovie.genre && movie.name != selectedMovie.name
      );
    });

    return (
      <div>
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
        <br />
        <hr />
        <h2>Similar movies</h2>
        {similarMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
      </div>
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
            key={movie.id}
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
