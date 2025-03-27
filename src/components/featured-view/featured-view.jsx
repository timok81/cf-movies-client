import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

//Displays detailed information
export const FeaturedView = ({ movie }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const movies = useSelector((state) => state.movies.list);
  const movieId = movie?.id;
  const selectedMovie = movies?.find((movie) => movie.id === movieId);
  const isFav = user?.FavouriteMovies?.includes(selectedMovie?.id) || false;

  return (
    selectedMovie && (
      <div className="justify-content-center featured-view">
        <div className="p-4 featured-image-container text-center justify-content-center">
          <Link to={`/movies/${encodeURIComponent(movieId)}`}>
            <img
              src={selectedMovie?.image}
              className="rounded movie-card featured-image"
              alt={`Movie poster`}
            />
          </Link>
        </div>

        <div className="py-4 featured-description">
          {selectedMovie?.description.slice(0, 400)}...
          <Link to={`/movies/${encodeURIComponent(movieId)}`}> (see more)</Link>
        </div>
        <br />
        <div className="featured-details pb-4 hide-on-small">
          <div className="mb-0">
            <p>Cast:</p>
            {selectedMovie?.actors.map((actor, index) => (
              <div key={index}>
                <Button
                  variant="secondary"
                  className="px-2 py-0 me-2 mb-2"
                  onClick={() =>
                    navigate(`/actors/${encodeURIComponent(actor)}`)
                  }
                >
                  {actor}
                </Button>
              </div>
            ))}
          </div>
          <div className="mb-0">
            <p>Genre:</p>
            <Button
              variant="secondary"
              className="px-2 py-0 me-2"
              onClick={() =>
                navigate(`/genres/${encodeURIComponent(selectedMovie?.genre)}`)
              }
            >
              {selectedMovie?.genre}
            </Button>
          </div>
          <div className="mb-0">
            <p>Director:</p>
            <Button
              variant="secondary"
              className="px-2 py-0 me-2"
              onClick={() =>
                navigate(
                  `/directors/${encodeURIComponent(selectedMovie.director)}`
                )
              }
            >
              {selectedMovie?.director}
            </Button>
          </div>
        </div>
        <div className="featured-bg"></div>
      </div>
    )
  );
};

FeaturedView.propTypes = {
  onFavToggle: PropTypes.func,
};
