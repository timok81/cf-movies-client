import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import "./movie-card.scss";

//Displays movie list item
export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100 movie-card" onClick={() => onMovieClick(movie)}>
      <div className="image-wrapper">
        <Card.Img variant="top" src={movie.image} />
      </div>
      <Card.Body>
        <Card.Title>{movie.name}</Card.Title>
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
  onMovieClick: PropTypes.func.isRequired,
};
