//Displays detailed movie information
export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.imagePath} />
      </div>
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
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <br/>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};
