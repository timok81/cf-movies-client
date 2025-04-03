import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

//Displays movie list item
export const MovieCard = ({ movie, isFav, onFavToggle }) => {
  let ratingClass;

  if (movie.rating <= 100)
    ratingClass = "movie-card-rating movie-card-rating-high";
  if (movie.rating <= 75)
    ratingClass = "movie-card-rating movie-card-rating-medium";
  if (movie.rating <= 50)
    ratingClass = "movie-card-rating movie-card-rating-low";

  return (
    <Card className="h-100 movie-card border-0">
      <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
        <div className="image-wrapper">
          <Card.Img variant="top" src={movie.image} title={movie.name} />
        </div>
      </Link>
      <Card.Body className="mb-0 card-body p-2 rounded">
        <button
          className={isFav ? "fav-button" : "fav-button fav-button-unactivated"}
          onClick={() => onFavToggle(movie.id)}
          title="Toggle favourite"
        >
          {isFav ? "★" : "☆"}
        </button>
        <div className={ratingClass}>{movie.rating}%</div>
        <Card.Title className="text-truncate mb-2">{movie.name}</Card.Title>
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
