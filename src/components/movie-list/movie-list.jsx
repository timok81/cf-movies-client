import React, { useState } from "react";
import { useSelector } from "react-redux";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { MovieCard } from "../movie-card/movie-card";
import PropTypes from "prop-types";
import Pagination from "../pagination/pagination";
import { ListFilter } from "../list-filter/list-filter";
import { FeaturedView } from "../featured-view/featured-view";
import { Link } from "react-router-dom";

export const MovieList = ({ onFavToggle }) => {
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const movies = useSelector((state) => state.movies.list);
  const [currentPage, setCurrentPage] = useState(1);
  const user = useSelector((state) => state.user.user);

  const itemsPerPage = 12;
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
    <Row className="justify-content-center p-2">
      <Row className="justify-content-center mb-5">
        <Col xs={10} sm={8} lg={6}>
          <ListFilter />
        </Col>
      </Row>

      <Row className="justify-content-center bg-light border rounded-4 mb-5 mx-0 px-0">
        <Row className="rounded-top align-items-center pt-3">
          <Col className="p-0">
            <button
              onClick={() =>
                setFeaturedIndex(
                  (featuredIndex - 1 + movies.length) % movies.length
                )
              }
              className="featured-prev"
              title="Previous movie"
            >
              ⯇
            </button>
          </Col>
          <Col className="text-center">
            <Link
              to={`/movies/${encodeURIComponent(movies[featuredIndex]?.id)}`}
              className="link-secondary"
            >
              <h2>{movies[featuredIndex]?.name}</h2>
            </Link>
          </Col>
          <Col className="p-0 text-end">
            <button
              onClick={() =>
                setFeaturedIndex((featuredIndex + 1) % movies.length)
              }
              className="featured-next"
              title="Next movie"
            >
              ►
            </button>
          </Col>
        </Row>
        <Row>
          <Col className="featured-list p-0">
            <FeaturedView movie={movies?.[featuredIndex]} />
          </Col>
        </Row>
      </Row>

      <Row className="mb-4 p-0">
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
                xl={2}
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
                itemsTotal={filter === "" ? movies.length : currentItems.length}
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
