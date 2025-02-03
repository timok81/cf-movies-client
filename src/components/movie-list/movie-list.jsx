import React from "react";
import { useSelector } from "react-redux";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { MovieFilter } from "../movie-filter/movie-filter";
import { MovieCard } from "../movie-card/movie-card";
import PropTypes from "prop-types";

export const MovieList = ({ onFavToggle }) => {
  const movies = useSelector((state) => state.movies.list);
  const user = useSelector((state) => state.user.user);

  const filter = useSelector((state) => state.movies.filter)
    .trim()
    .toLowerCase();
  const filteredMovies = movies.filter(
    (movie) =>
      movie.name.toLowerCase().includes(filter) ||
      movie.genre.toLowerCase().includes(filter)
  );

  return (
    <Row className="justify-content-center">
      <Row className="justify-content-center mb-5">
        <Col xs={10} sm={8} lg={6}>
          <MovieFilter />
        </Col>
      </Row>
      <Row className="">
        {movies.length === 0 ? (
          <Col className="text-center">Loading movies...</Col>
        ) : (
          filteredMovies.map((movie) => (
            <Col
              className="mb-4"
              key={movie.id}
              xs={12}
              sm={6}
              md={4}
              lg={4}
              xl={3}
            >
              <MovieCard
                movie={movie}
                isFav={user?.FavouriteMovies?.includes(movie.id) || false}
                onFavToggle={() => onFavToggle(movie.id, user)}
              />
            </Col>
          ))
        )}
      </Row>
    </Row>
  );
};

MovieList.propTypes = {
  onFavToggle: PropTypes.func,
};
