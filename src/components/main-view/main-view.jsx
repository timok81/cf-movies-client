import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  console.log(token);

  useEffect(() => {
    if (!token) return;

    fetch("https://moviemovie-7703363b92cb.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        const moviesFromApi = movies.map((obj) => {
          return {
            id: obj._id,
            name: obj.Name,
            image: obj.ImagePath,
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
  }, [token]);

  if (!user) {
    return (
      <div>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        <br />
        <SignupView />
      </div>
    );
  }

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

      <button
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        }}
      >
        Log out
      </button>
    </div>
  );
};

export default MainView;
