import React, { useState } from "react";
import { useSelector } from "react-redux";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { MovieCard } from "../movie-card/movie-card";
import PropTypes from "prop-types";
import Pagination from "../pagination/pagination";
import { ListFilter } from "../list-filter/list-filter";

export const MovieList = ({ onFavToggle }) => {
  const movies = useSelector((state) => state.movies.list);
  const [currentPage, setCurrentPage] = useState(1);
  const user = useSelector((state) => state.user.user);

  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = movies.slice(indexOfFirstItem, indexOfLastItem);

  function handlePagination(pageNumber) {
    setCurrentPage(pageNumber);
  }

  const filter = useSelector((state) => state.movies.filter)
    .trim()
    .toLowerCase();
  const filteredMovies =
    filter === ""
      ? currentItems
      : movies.filter(
          (movie) =>
            movie.name.toLowerCase().includes(filter) ||
            movie.genre.toLowerCase().includes(filter) ||
            movie.director.toLowerCase().includes(filter)
        );

  return (
    <Row className="justify-content-center">
      <Row className="justify-content-center mb-5">
        <Col xs={10} sm={8} lg={6}>
          <ListFilter />
        </Col>
      </Row>
      <Row className="mb-4">
        {movies.length === 0 ? (
          <Col className="text-center">Loading movies...</Col>
        ) : (
          <>
            {filteredMovies.map((movie) => (
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
            ))}
            {
              <Pagination
                itemsPerPage={itemsPerPage}
                itemsTotal={
                  filter === "" ? movies.length : currentItems.length
                }
                currentPage={currentPage}
                handlePagination={handlePagination}
              />
            }
          </>
        )}
      </Row>
    </Row>
  );
};

MovieList.propTypes = {
  onFavToggle: PropTypes.func,
};
