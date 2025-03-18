import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import NavigationBar from "../navigation-bar/navigation-bar";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";
import { setActors } from "../../redux/reducers/actors";
import { setDirectors } from "../../redux/reducers/directors";
import { setToken, setUser } from "../../redux/reducers/user/user";
import { MovieList } from "../movie-list/movie-list";
import { GenreList } from "../genre-list/genre-list";
import { ActorList } from "../actor-list/actor-list";
import { ActorView } from "../actor-view/actor-view";
import { setDirectors } from "../../redux/reducers/directors";
import { DirectorList } from "../director-list/director-list";
import { DirectorView } from "../director-view/director-view";
import { setGenres } from "../../redux/reducers/genres";
import { GenreView } from "../genre-view/genre-view";
import { Footer } from "../footer/footer";
import { ToastContainer } from "react-toastify";

const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const movies = useSelector((state) => state.movies.list);

  const actors = useSelector((state) => state.actors.list);
  const directors = useSelector((state) => state.directors.list);
  const genres = useSelector((state) => state.genres.list);

  const user = storedUser
    ? storedUser
    : useSelector((state) => state.user.user);

  const token = storedToken
    ? storedToken
    : useSelector((state) => state.user.token);

  const dispatch = useDispatch();

  //Make sure user/token are up to date
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      dispatch(setUser(storedUser));
      dispatch(setToken(storedToken));
    }
  }, [dispatch]);

  //Fetch movies/directors/genres from api
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
            featured: obj.Featured,
            trailer: obj.TrailerPath,
          };
        });

        //Extract directors from movies
        const directorsFromMovies = movies.map((obj) => {
          return {
            name: obj.Director.Name,
            bio: obj.Director.Bio,
            birth: obj.Director.BirthYear,
            death: obj.Director.DeathYear,
            image: obj.Director.ImagePath,
          };
        });

        const objToId = ({ name }) => `${name}`;

        const directorIds = directorsFromMovies.map(objToId);
        const filteredDirectors = directorsFromMovies.filter(
          (item, index) => !directorIds.includes(objToId(item), index + 1)
        );

        //Extract genres from movies
        const genresFromMovies = movies.map((obj) => {
          return {
            name: obj.Genre.Name,
            description: obj.Genre.Description,
          };
        });

        const genreIds = genresFromMovies.map(objToId);
        const filteredGenres = genresFromMovies.filter(
          (item, index) => !genreIds.includes(objToId(item), index + 1)
        );

        dispatch(setDirectors(filteredDirectors));
        dispatch(setGenres(filteredGenres));
        dispatch(setMovies(moviesFromApi));
      });
  }, [token]);

  //Fetch actors from api
  useEffect(() => {
    if (!token) return;

    fetch("https://moviemovie-7703363b92cb.herokuapp.com/actors", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((actors) => {
        const actorsFromApi = actors.map((obj) => {
          return {
            id: obj._id,
            name: obj.Name,
            bio: obj.Bio,
            birth: obj.BirthYear,
            death: obj.DeathYear,
            image: obj.ImagePath,
          };
        });
        dispatch(setActors(actorsFromApi));
      });
  }, [token]);

  const RedirectToSwagger = () => {
    useEffect(() => {
      window.location.replace(
        "https://moviemovie-7703363b92cb.herokuapp.com/api-documentation"
      );
    }, []);

    return null;
  };

  //Clicking on fav button
  const handleFavToggle = async (movieId, user) => {
    if (user.FavouriteMovies.includes(movieId)) {
      await handleRemoveFromFavs(movieId);
    } else {
      await handleAddToFavs(movieId);
    }
  };

  //Try to add movie to favs
  const handleAddToFavs = async (movieId) => {
    try {
      const response = await fetch(
        `https://moviemovie-7703363b92cb.herokuapp.com/users/${user._id}/movies/${movieId}`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        const updatedUser = await response.json();
        dispatch(setUser(updatedUser));
        localStorage.setItem("user", JSON.stringify(updatedUser));
      } else {
        alert("Failed to add movie to favorites");
      }
    } catch (err) {
      console.error("Request failed:", err);
    }
  };

  //Try to remove movie from favs
  const handleRemoveFromFavs = async (movieId) => {
    try {
      const response = await fetch(
        `https://moviemovie-7703363b92cb.herokuapp.com/users/${user._id}/movies/${movieId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        const updatedUser = await response.json();
        dispatch(setUser(updatedUser));
        localStorage.setItem("user", JSON.stringify(updatedUser));
      } else {
        alert("Failed to remove movie from favorites");
      }
    } catch (err) {
      console.error("Request failed:", err);
    }
  };

  return (
    <BrowserRouter>
      <NavigationBar />
      <ToastContainer position="top-center" />
      <Row className="justify-content-center w-100 mx-0 content-row">
        <Col md={8}>
          <Routes>
            <Route path="/api-documentation" element={<RedirectToSwagger />} />
            <Route
              path="/signup"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Row className="justify-content-center">
                      <Row className="justify-content-center">
                        <Col sm={8} md={8} lg={6} className="px-0">
                          <h1 className="welcome mb-0">Welcome to the</h1>
                          <h2 className="title mb-2">Movie database</h2>
                          <hr />
                          <br />
                        </Col>
                      </Row>
                      <Col sm={8} md={8} lg={6}>
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
                        <Col sm={8} md={8} lg={6} className="px-0">
                          <h1 className="welcome mb-0">Welcome to the</h1>
                          <h2 className="title mb-2">Movie database</h2>
                          <hr />
                          <br />
                        </Col>
                      </Row>
                      <Col sm={8} md={8} lg={6}>
                        <LoginView />
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
                      <ProfileView onFavToggle={handleFavToggle} />
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
                    <Col>Loading movie...</Col>
                  ) : (
                    <Col>
                      <MovieView
                        favouriteMovies={user.FavouriteMovies}
                        onFavToggle={handleFavToggle}
                      />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/actors"
              element={
                <>{!user ? <Navigate to="/login" replace /> : <ActorList />}</>
              }
            />
            <Route
              path="/actors/:actorName"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : actors.length === 0 ? (
                    <Col>Loading actor...</Col>
                  ) : (
                    <Col>
                      <ActorView
                        favouriteMovies={user.FavouriteMovies}
                        onFavToggle={handleFavToggle}
                      />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/directors"
              element={
                <>
                  {!user ? <Navigate to="/login" replace /> : <DirectorList />}
                </>
              }
            />
            <Route
              path="/directors/:directorName"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : directors.length === 0 ? (
                    <Col>Loading director...</Col>
                  ) : (
                    <Col>
                      <DirectorView
                        favouriteMovies={user.FavouriteMovies}
                        onFavToggle={handleFavToggle}
                      />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/genres"
              element={
                <>{!user ? <Navigate to="/login" replace /> : <GenreList />}</>
              }
            />
            <Route
              path="/genres/:genreName"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : genres.length === 0 ? (
                    <Col>Loading genre...</Col>
                  ) : (
                    <Col>
                      <GenreView
                        favouriteMovies={user.FavouriteMovies}
                        onFavToggle={handleFavToggle}
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
                  ) : (
                    <>
                      <MovieList onFavToggle={handleFavToggle} />
                    </>
                  )}
                </>
              }
            />
          </Routes>
        </Col>
      </Row>
      <Footer />
    </BrowserRouter>
  );
};

export default MainView;
