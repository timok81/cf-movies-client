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
      <Row className="mb-2 p-0">
        <div className="d-flex justify-content-between align-items-center p-0">
          <div className="d-flex align-items-center">
            <BackButton />
            <h1 className="ms-2">{selectedMovie.name}</h1>
          </div>
          <h2 className="text-muted">{selectedMovie.released}</h2>
        </div>
      </Row>

      <Row className="mb-4 p-0">
        <div className="ratio ratio-16x9 p-0 m-0">
          <iframe
            width="1250"
            height="703"
            src={selectedMovie.trailer}
            title="Interstellar Movie - Official Trailer"
            frameBorder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
          ></iframe>
        </div>
      </Row>
<hr />
      <Row className="rounded p-0 mb-3">
        <Col md={4} className="p-0">
          <img
            src={selectedMovie.image}
            className="w-100 rounded movie-view-image"
            alt={`${selectedMovie.name} poster`}
          />
        </Col>
        <Col className="movie-view-info">
          <Row className="h-25">
            <Col>
              <div>{selectedMovie.description}</div>
            </Col>
          </Row>
          <Row className="h-75 d-flex align-content-end">
            <div className="d-flex justify-content-between">
              <div className="w-100">
                <h4>Genre:</h4>
                <div className="mb-3">
                  <Button
                    variant="secondary"
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
                <h4>Director:</h4>
                <div className="mb-3">
                  <Button
                    variant="secondary"
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
                <h4>Cast:</h4>
                <div>
                  {selectedMovie.actors.map((actor, index) => (
                    <>
                      <Button
                        key={index}
                        variant="secondary"
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
                  className="fav-buttonB p-0 fw-bold"
                  onClick={() => onFavToggle(selectedMovie.id, user)}
                  title="Toggle favourite"
                >
                  {isFav ? "★" : "☆"}
                </button>
              </div>
            </div>
          </Row>
          <br />
        </Col>
      </Row>
<hr />
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
