import { useSelector } from "react-redux";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { MovieCard } from "../movie-card/movie-card";
import PropTypes from "prop-types";
import { useState } from "react";
import { Button } from "react-bootstrap";
import TrailerCard from "../trailer-card/trailer-card";
import Spinner from "react-bootstrap/Spinner";

export const MoviesScroller = ({
  onFavToggle,
  heading,
  filterType,
  contentType,
}) => {
  const user = useSelector((state) => state.user.user);
  const movies = useSelector((state) => state.movies.list);
  const [selectedGenre, setSelectedGenre] = useState("Action");
  let filteredMovies = movies.slice(0, 15);

  if (filterType === "latest") {
    filteredMovies = movies
      .toSorted((a, b) => b.updatedAt - a.updatedAt)
      .slice(0, 15);
  }

  if (filterType === "topRated") {
    filteredMovies = movies
      .toSorted((a, b) => b.rating - a.rating)
      .slice(0, 15);
  }

  if (filterType === "genre") {
    const genreMovies = movies.filter((movie) => movie.genre === selectedGenre);
    filteredMovies = genreMovies
      .toSorted((a, b) => b.rating - a.rating)
      .slice(0, 15);
  }

  if (contentType === "movie") {
    return (
      <div>
        <h2 className="scroller-heading">{heading}</h2>
        {filterType === "genre" && (
          <Row className="scroller-heading">
            <Col className="mt-2">
              <Button
                className="me-2 btn-secondary rounded-5 mb-2"
                onClick={() => setSelectedGenre("Action")}
              >
                Action
              </Button>
              <Button
                className="me-2 btn-secondary rounded-5 mb-2"
                onClick={() => setSelectedGenre("Comedy")}
              >
                Comedy
              </Button>
              <Button
                className="me-2 btn-secondary rounded-5 mb-2"
                onClick={() => setSelectedGenre("Sci-Fi")}
              >
                Sci-Fi
              </Button>
              <Button
                className="me-2 btn-secondary rounded-5 mb-2"
                onClick={() => setSelectedGenre("Drama")}
              >
                Drama
              </Button>
              <Button
                className="me-2 btn-secondary rounded-5 mb-2"
                onClick={() => setSelectedGenre("Crime")}
              >
                Crime
              </Button>
              <Button
                className="me-2 btn-secondary rounded-5 mb-2"
                onClick={() => setSelectedGenre("Thriller")}
              >
                Thriller
              </Button>
              <Button
                className="me-2 btn-secondary rounded-5 mb-2"
                onClick={() => setSelectedGenre("Fantasy")}
              >
                Fantasy
              </Button>
            </Col>
          </Row>
        )}
        <Row className="mb-4 p-0 movie-list-frame">
          <div className="movie-list-fadeout"></div>
          {movies.length === 0 ? (
            <Col className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </Col>
          ) : (
            <Col className="movie-list-container">
              {filteredMovies.map((movie) => (
                <div className="movie-list-card-container mx-2" key={movie.id}>
                  <MovieCard
                    className="movie-card"
                    movie={movie}
                    isFav={user?.FavouriteMovies?.includes(movie.id) || false}
                    onFavToggle={() => onFavToggle(movie.id, user)}
                  />
                </div>
              ))}
            </Col>
          )}
        </Row>
      </div>
    );
  }

  if (contentType === "trailer") {
    return (
      <div>
        <h2 className="scroller-heading">{heading}</h2>
        <Row className="mb-4 p-0 movie-list-frame trailer-list-frame">
          <div className="movie-list-fadeout"></div>
          {movies.length === 0 ? (
            <Col className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </Col>
          ) : (
            <Col className="movie-list-container">
              {filteredMovies.map((movie) => (
                <div
                  className="movie-list-trailer-container mx-2"
                  key={movie.id}
                  width={200}
                >
                  <TrailerCard movie={movie} />
                </div>
              ))}
            </Col>
          )}
        </Row>
      </div>
    );
  }
};

MoviesScroller.propTypes = {
  onFavToggle: PropTypes.func,
  heading: PropTypes.string,
};
