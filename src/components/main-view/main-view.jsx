import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import NavigationBar from "../../navigation-bar/navigation-bar";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import "./main-view.scss";

const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

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

  //Try to delete account
  function handleDeleteAccount() {
    fetch(`https://moviemovie-7703363b92cb.herokuapp.com/users/${user._id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (response.ok) {
          alert("Account has been deleted");
          setUser(null);
          setToken(null);
          localStorage.clear();
        } else {
          alert("Failed to delete account");
        }
      })
      .catch((err) => console.error("Request failed:", err));
  }

  //Clicking on fav button
  function onFavToggle(isFav, movieId) {
    if (isFav) handleRemoveFromFavs(movieId);
    else handleAddToFavs(movieId);
  }

  //Try to add movie to favs
  const handleAddToFavs = (movieId) => {
    fetch(
      `https://moviemovie-7703363b92cb.herokuapp.com/users/${user._id}/movies/${movieId}`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        if (response.ok) {
          const updatedUser = {
            ...user,
            FavouriteMovies: [...user.FavouriteMovies, movieId],
          };
          setUser(updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));
          //alert("Movie successfully added to favorites");
        } else {
          alert("Failed to add movie to favorites");
        }
      })
      .catch((err) => console.error("Request failed:", err));
  };

  //Try to remove movie from favs
  const handleRemoveFromFavs = (movieId) => {
    fetch(
      `https://moviemovie-7703363b92cb.herokuapp.com/users/${user._id}/movies/${movieId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        if (response.ok) {
          const updatedUser = {
            ...user,
            FavouriteMovies: user.FavouriteMovies.filter(
              (id) => id !== movieId
            ),
          };
          setUser(updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));
          //alert("Movie successfully removed from favorites");
        } else {
          alert("Failed to remove movie from favorites");
        }
      })
      .catch((err) => console.error("Request failed:", err));
  };

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Routes>
            <Route
              path="/signup"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Row className="justify-content-center">
                      <Row className="justify-content-center">
                        <Col md={5} className="px-0">
                          <h1 className="welcome mb-0">Welcome to the</h1>
                          <h2 className="title mb-5">Movie database</h2>
                          <hr />
                          <br />
                        </Col>
                      </Row>
                      <Col md={5}>
                        <SignupView />
                      </Col>
                    </Row>
                  )}
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Row className="justify-content-center">
                      <Row className="justify-content-center">
                        <Col md={5} className="px-0">
                          <h1 className="welcome mb-0">Welcome to the</h1>
                          <h2 className="title mb-5">Movie database</h2>
                          <hr />
                          <br />
                        </Col>
                      </Row>
                      <Col md={5}>
                        <LoginView
                          onLoggedIn={(user) => {
                            setUser(user);
                            setToken(token);
                          }}
                        />
                      </Col>
                    </Row>
                  )}
                </>
              }
            />
            <Route
              path={`/profile/:userName`}
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" />
                  ) : (
                    <Col>
                      <ProfileView
                        user={user}
                        token={token}
                        movies={movies}
                        onFavToggle={onFavToggle}
                        onDeleteAccount={handleDeleteAccount}
                      />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/movies/:movieId"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    <Col>
                      <MovieView
                        movies={movies}
                        favouriteMovies={user.FavouriteMovies}
                        onFavToggle={onFavToggle}
                      />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    <Row className="g-4 justify-content-center">
                      {movies.map((movie) => (
                        <Col
                          className="mb-4"
                          key={movie.id}
                          xs={10}
                          sm={5}
                          md={4}
                          lg={4}
                          xl={3}
                        >
                          <MovieCard
                            movie={movie}
                            isFav={user.FavouriteMovies.includes(movie.id)}
                            onFavToggle={onFavToggle}
                          />
                        </Col>
                      ))}
                    </Row>
                  )}
                </>
              }
            />
          </Routes>
        </Col>
      </Row>
    </BrowserRouter>
  );
};

export default MainView;
