import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

//Displays movie list item
export const MovieCard = ({ movie, isFav, onFavToggle }) => {

  return (
    <Card className="h-100 movie-card border-0">
      <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
        <div className="image-wrapper">
          <Card.Img variant="top" src={movie.image} />
        </div>
      </Link>
      <Card.Body className="mb-0 card-body rounded">
        <button
          className="fav-button"
          onClick={() => onFavToggle(movie.id)}
        >
          {isFav ? "★" : "☆"}
        </button>
        <Card.Title className="fw-bold">{movie.name}</Card.Title>
        <Card.Text>{movie.genre}</Card.Text>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
    released: PropTypes.string,
    actors: PropTypes.array,
    director: PropTypes.string,
    genre: PropTypes.string,
    Description: PropTypes.string,
  }).isRequired,
  isFav: PropTypes.bool,
  onFavToggle: PropTypes.func.isRequired,
};
