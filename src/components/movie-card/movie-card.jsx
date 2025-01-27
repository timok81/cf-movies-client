import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

//Displays movie list item
export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100" onClick={() => onMovieClick(movie)}>
      <Card.Img variant="top" src={movie.image} className=""/>
      <Card.Body>
        <Card.Title>{movie.name}</Card.Title>
        <Card.Text>{movie.director}</Card.Text>
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
