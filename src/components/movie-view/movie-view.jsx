import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { useSelector, useDispatch } from "react-redux";
import { BackButton } from "../back-button/back-button";
import Button from "react-bootstrap/Button";
import { setFilter } from "../../redux/reducers/actors";

export const MovieView = ({ onFavToggle }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const movies = useSelector((state) => state.movies.list);
  const { movieId } = useParams();
  const selectedMovie = movies.find((movie) => movie.id === movieId);

  const similarMovies = movies.filter((movie) => {
    return (
      movie.genre === selectedMovie?.genre && movie.name !== selectedMovie?.name
    );
  });

  const isFav = user?.FavouriteMovies?.includes(selectedMovie?.id) || false;

  return (
    <Row className="justify-content-center mx-1">
      <Row className="mb-2 p-0">
        <div className="d-flex justify-content-between align-items-center p-0">
          <div className="d-flex align-items-center">
            <BackButton />
            <h1 className="ms-2">{selectedMovie?.name}</h1>
          </div>
          <h2 className="text-muted">{selectedMovie?.released}</h2>
        </div>
      </Row>

      <Row className="mb-5 p-0">
        <div className="ratio ratio-16x9 p-0 m-0">
          <iframe
            width="1250"
            height="703"
            src={selectedMovie?.trailer?.Path}
            title="Interstellar Movie - Official Trailer"
            frameBorder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
          ></iframe>
        </div>
      </Row>

      <Row className="rounded p-0 bg-light border rounded-4 p-4">
        <Col sm={3} className="p-0 me-2">
          <img
            src={selectedMovie?.image}
            className="w-100 rounded movie-view-image"
            alt={`${selectedMovie?.name} poster`}
          />
        </Col>
        <Col className="movie-view-info">
          <Row className="h-25">
            <Row className="mb-2">
              <p>Rating</p>
              <h2>{selectedMovie?.rating}%</h2>
            </Row>
            <Col>
              <div>{selectedMovie?.description}</div>
            </Col>
          </Row>
          <Row className="h-75 d-flex align-content-end">
            <div className="d-flex justify-content-between">
              <div className="d-flex flex-wrap">
                <div>
                  <p>Cast</p>
                  {selectedMovie?.actors.map((actor, index) => (
                    <div key={index}>
                      <Button
                        variant="secondary"
                        className="px-2 py-0 me-2 mb-2"
                        onClick={() =>
                          navigate(`/actors/${encodeURIComponent(actor.name)}`)
                        }
                      >
                        {actor.name}
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="mb-3">
                  <p>Director</p>
                  <Button
                    variant="secondary"
                    className="px-2 py-0 me-2"
                    onClick={() =>
                      navigate(
                        `/directors/${encodeURIComponent(
                          selectedMovie?.director
                        )}`
                      )
                    }
                  >
                    {selectedMovie?.director}
                  </Button>
                </div>
                <div className="mb-3">
                  <p>Genre</p>
                  <Button
                    variant="secondary"
                    className="px-2 py-0 me-2"
                    onClick={() => {
                      navigate(`/movies`);
                      dispatch(setFilter(selectedMovie?.genre));
                    }}
                  >
                    {selectedMovie?.genre}
                  </Button>
                </div>
              </div>
              <div className="">
                <button
                  className={
                    isFav
                      ? "fav-button-large"
                      : "fav-button-large fav-button-large-unactivated"
                  }
                  onClick={() => onFavToggle(selectedMovie?.id, user)}
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

      <Row className="g-4 mb-5 p-0">
        <h2>Similar movies</h2>
        {similarMovies.map((movie) => (
          <Col key={movie.id} xs={12} sm={6} md={4} lg={4} xl={2}>
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
