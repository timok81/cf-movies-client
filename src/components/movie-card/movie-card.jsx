import PropTypes from "prop-types";

//Displays movie list item
export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      <p>{movie.name}</p>
    </div>
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
