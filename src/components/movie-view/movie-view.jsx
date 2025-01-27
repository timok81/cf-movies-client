import PropTypes from "prop-types";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "./movie-view.scss";

//Displays detailed movie information
export const MovieView = ({ movie, onBackClick }) => {
  return (
    <Row>
      <Col className="mb-4">
        <img src={movie.image} className="w-100" />
      </Col>

      <Col md={8}>
        <Row className="h-75 align-content-start">
          <div className="mb-1">
            <h1>{movie.name}</h1>
          </div>
          <div className="mb-3 genre">
            {movie.genre}
          </div>
          <div className="mb-1">
            <span className="subject">Released: </span>
            {movie.released}
          </div>
          <div className="mb-1">
            <span className="subject">Director: </span>
            {movie.director}
          </div>
          <div className="mb-1">
            <span className="subject">Actors: </span>
            {movie.actors.map((actor, index) => {
              if (index < movie.actors.length - 1) return actor + ", ";
              else return actor;
            })}
          </div>
          <div className="mb-1">
            <span className="subject">Description: </span>
            {movie.description}
          </div>
        </Row>
        <Row className="h-25 align-content-end pb-4">
          <Col>
            <Button variant="secondary" onClick={onBackClick}>Back</Button>
          </Col>
        </Row>
        <br />
      </Col>
    </Row>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
    released: PropTypes.string,
    actors: PropTypes.array,
    director: PropTypes.string,
    genre: PropTypes.string,
    Description: PropTypes.string,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
