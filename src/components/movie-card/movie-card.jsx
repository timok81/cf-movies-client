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
