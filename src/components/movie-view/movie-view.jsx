import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { useSelector } from "react-redux";
import { BackButton } from "../back-button/back-button";
import Button from "react-bootstrap/Button";

//Displays detailed information
export const MovieView = ({ onFavToggle }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const movies = useSelector((state) => state.movies.list);
  const { movieId } = useParams();
  const selectedMovie = movies.find((movie) => movie.id === movieId);

  const similarMovies = movies.filter((movie) => {
    return (
      movie.genre === selectedMovie.genre && movie.name !== selectedMovie.name
    );
  });

  const isFav = user?.FavouriteMovies?.includes(selectedMovie.id) || false;

  return (
    <Row className="justify-content-center mx-1">
      <Row className="mb-3">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <BackButton />
            <h1 className="fw-bold ms-2">{selectedMovie.name}</h1>
          </div>
          <h2 className="text-muted">{selectedMovie.released}</h2>
        </div>
      </Row>

      <Row className="rounded p-3 movie-view-main">
        <Col md={4} className="p-0">
          <img
            src={selectedMovie.image}
            className="w-100 rounded"
            alt={`${selectedMovie.name} poster`}
          />
        </Col>
        <Col className="p-3">
          <Row className="h-25">
            <Col>
              <div>{selectedMovie.description}</div>
            </Col>
          </Row>
          <Row className="h-75 d-flex align-content-end">
            <div className="d-flex justify-content-between">
              <div className="w-100">
                <hr />
                <h4 className="fw-bold">Genre:</h4>
                <div className="mb-3">
                  <Button
                    variant="dark"
                    className="px-2 py-0 me-2"
                    onClick={() =>
                      navigate(
                        `/genres/${encodeURIComponent(selectedMovie.genre)}`
                      )
                    }
                  >
                    {selectedMovie.genre}
                  </Button>
                </div>
                <h4 className="fw-bold">Director:</h4>
                <div className="mb-3">
                  <Button
                    variant="dark"
                    className="px-2 py-0 me-2"
                    onClick={() =>
                      navigate(
                        `/directors/${encodeURIComponent(
                          selectedMovie.director
                        )}`
                      )
                    }
                  >
                    {selectedMovie.director}
                  </Button>
                </div>
                <h4 className="fw-bold">Cast:</h4>
                <div>
                  {selectedMovie.actors.map((actor, index) => (
                    <>
                      <Button
                        key={index}
                        variant="dark"
                        className="px-2 py-0 me-2 mb-2"
                        onClick={() =>
                          navigate(`/actors/${encodeURIComponent(actor)}`)
                        }
                      >
                        {actor}
                      </Button>
                    </>
                  ))}
                </div>
              </div>
              <div className="align-content-end">
                <button
                  className="fav-buttonB"
                  onClick={() => onFavToggle(selectedMovie.id, user)}
                  title="Add to favourites"
                >
                  {isFav ? "★" : "☆"}
                </button>
              </div>
            </div>
          </Row>
          <br />
        </Col>
      </Row>

      <Row className="g-4 mb-5 p-0">
        <h2>Similar movies</h2>
        {similarMovies.map((movie) => (
          <Col className="" key={movie.id} xs={12} sm={6} md={4} lg={4} xl={3}>
            <MovieCard
              movie={movie}
              isFav={user?.FavouriteMovies?.includes(movie.id) || false}
              onFavToggle={() => onFavToggle(movie.id, user)}
            />
          </Col>
        ))}
      </Row>
    </Row>
  );
};

MovieView.propTypes = {
  onFavToggle: PropTypes.func,
};
