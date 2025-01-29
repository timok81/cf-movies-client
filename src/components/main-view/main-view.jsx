import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
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

  /*
  return (
    <>
      {!user ? (
        <Row className="justify-content-center">
          <Row className="justify-content-center">
            <Col lg={9} className="px-0">
              <h1 className="welcome mb-0">Welcome to the</h1>
              <h2 className="title mb-5">Movie database</h2>
              <hr />
              <br />
            </Col>
          </Row>

          <Col lg={4}>
            <LoginView
              onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
              }}
            />
            <br />
            <br />
          </Col>
          <Col lg={1}></Col>
          <Col lg={4}>
            <SignupView />
          </Col>
        </Row>
      ) : selectedMovie ? (
        <>
          {(() => {
            const similarMovies = movies.filter((movie) => {
              return (
                movie.genre === selectedMovie.genre &&
                movie.name !== selectedMovie.name
              );
            });

            return (
              <>
                <Row>
                  <Col>
                    <MovieView
                      movie={selectedMovie}
                      onBackClick={() => setSelectedMovie(null)}
                    />
                  </Col>
                </Row>
                <br />
                <Row className="g-4">
                  <h2>Similar movies</h2>
                  {similarMovies.map((movie) => (
                    <Col key={movie.id} md={3} className="movie-card">
                      <MovieCard
                        movie={movie}
                        onMovieClick={(newSelectedMovie) => {
                          setSelectedMovie(newSelectedMovie);
                        }}
                      />
                    </Col>
                  ))}
                </Row>
              </>
            );
          })()}
        </>
      ) : movies.length === 0 ? (
        <Row className="justify-content-md-center">
          <Col>No movies to display</Col>
        </Row>
      ) : (
        <>
          <Row className="g-4">
            {movies.map((movie) => {
              return (
                <Col key={movie.id} sm={6} md={4} lg={3} className="movie-card">
                  <MovieCard
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                      setSelectedMovie(newSelectedMovie);
                    }}
                  />
                </Col>
              );
            })}
          </Row>

          <Row>
            <Col className="align-content-md-center">
              <Button
                variant="secondary"
                onClick={() => {
                  setUser(null);
                  setToken(null);
                  localStorage.removeItem("user");
                  localStorage.removeItem("token");
                }}
              >
                Log out
              </Button>
            </Col>
          </Row>
        </>
      )}
    </>
  );
*/

  return (
    <BrowserRouter>
      
      <Row className="justify-content-md-center">
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
                      <Col lg={9} className="px-0">
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
                      <Col lg={9} className="px-0">
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
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col>
                    <MovieView movies={movies} />
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
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie.id} md={3}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

export default MainView;
