import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./movie-view.scss";
import { MovieCard } from "../movie-card/movie-card";

//Displays detailed movie information
export const MovieView = ({ movies, favouriteMovies, onFavToggle }) => {
  const { movieId } = useParams();
  const selectedMovie = movies.find((movie) => movie.id === movieId);

  const similarMovies = movies.filter((movie) => {
    return (
      movie.genre === selectedMovie.genre && movie.name !== selectedMovie.name
    );
  });

  return (
    <Row>
      <Col md={4} className="mb-4">
        <img
          src={selectedMovie.image}
          className="w-100 rounded"
          alt={`${selectedMovie.name} poster`}
        />
      </Col>

      <Col>
        <Row className="h-50 align-content-start">
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="fw-bold">{selectedMovie.name}</h1>
              <h2 className="text-muted">{selectedMovie.released}</h2>
            </div>
            <h3 className="mb-4 text-muted">{selectedMovie.genre}</h3>
            <hr />
            <div>{selectedMovie.description}</div>
          </Col>
        </Row>
        <Row className="h-50 d-flex align-content-end pb-4">
          <div className="d-flex justify-content-between">
            <div>
              <h4>Director:</h4>
              <div className="mb-4">{selectedMovie.director}</div>
              <h4>Cast:</h4>
              <div>{selectedMovie.actors.join(", ")}</div>
            </div>
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
        <h2>Similar movies</h2>
        {similarMovies.map((movie) => (
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

MovieView.propTypes = {
 movies: PropTypes.array,
 favouriteMovies: PropTypes.array,
 onFavToggle: PropTypes.func
};
