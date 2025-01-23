import PropTypes from "prop-types";

//Displays detailed movie information
export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <img src={movie.image} height={400} />
      <div>
        <h1>{movie.name}</h1>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre}</span>
      </div>
      <div>
        <span>Released: </span>
        <span>{movie.released}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director}</span>
      </div>
      <div>
        <span>Actors: </span>
        <span>
          {movie.actors.map((actor, index) => {
            if (index < movie.actors.length - 1) return actor + ", ";
            else return actor;
          })}
        </span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <br />
      <button onClick={onBackClick}>Back</button>
    </div>
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
