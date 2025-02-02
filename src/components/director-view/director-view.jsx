import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./director-view.scss";
import { MovieCard } from "../movie-card/movie-card";
import { useSelector } from "react-redux";

//Displays detailed information
export const DirectorView = ({ favouriteMovies, onFavToggle }) => {
  const directors = useSelector((state) => state.directors.list);
  const movies = useSelector((state) => state.movies.list);
  const { directorName } = useParams();
  const selectedDirector = directors.find(
    (director) => director.name === directorName
  );

  const directedMovies = movies.filter(
    (movie) => movie.director === selectedDirector.name
  );

  return (
    <Row>
      <Col md={4} className="mb-4">
        <img
          src={selectedDirector.image}
          className="w-100 rounded"
          alt={`${selectedDirector.name} poster`}
        />
      </Col>

      <Col>
        <Row className="h-50 align-content-start">
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="fw-bold">{selectedDirector.name}</h1>
            </div>
            <hr />
            <div>Born: {selectedDirector.birth}</div>

            <br />
            <div>{selectedDirector.bio}</div>
          </Col>
        </Row>
        <Row className="h-50 d-flex align-content-end pb-4">
          <div className="d-flex justify-content-between">
            <div className="align-content-end">
              <Link to={`/`}>
                <Button variant="outline-secondary" size="lg">
                  Back
                </Button>
              </Link>
            </div>
          </div>
        </Row>
        <br />
      </Col>

      <Row className="g-4 mb-5">
        <h2>Movies</h2>
        {directedMovies.map((movie) => (
          <Col key={movie.id} md={3} className="movie-card">
            <MovieCard
              movie={movie}
              isFav={favouriteMovies.includes(movie.id)}
              onFavToggle={onFavToggle}
            />
          </Col>
        ))}
      </Row>
    </Row>
  );
};

DirectorView.propTypes = {
  favouriteMovies: PropTypes.array,
  onFavToggle: PropTypes.func,
};
