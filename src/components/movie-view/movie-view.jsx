import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./movie-view.scss";

//Displays detailed movie information
export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((movie) => movie.id === movieId);

  return (
    <Row>
      <Col md={4} className="mb-4">
        <img
          src={movie.image}
          className="w-100 rounded"
          alt={`${movie.name} poster`}
        />
      </Col>

      <Col>
        <Row className="h-50 align-content-start">
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="fw-bold">{movie.name}</h1>
              <h2 className="text-muted">{movie.released}</h2>
            </div>
            <h3 className="mb-4 text-muted">{movie.genre}</h3>
            <hr />
            <div>{movie.description}</div>
          </Col>
        </Row>
        <Row className="h-50 d-flex align-content-end pb-4">
          <div className="d-flex justify-content-between">
            <div>
              <h4>Director:</h4>
              <div className="mb-4">{movie.director}</div>
              <h4>Cast:</h4>
              <div>{movie.actors.join(", ")}</div>
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
