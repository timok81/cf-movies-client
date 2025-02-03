import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./actor-view.scss";
import { MovieCard } from "../movie-card/movie-card";
import { useSelector } from "react-redux";
import { BackButton } from "../back-button/back-button";

//Displays detailed information
export const ActorView = ({ onFavToggle }) => {
  const user = useSelector((state) => state.user.user);
  const actors = useSelector((state) => state.actors.list);
  const movies = useSelector((state) => state.movies.list);
  const { actorName } = useParams();
  const selectedActor = actors.find((actor) => actor.name === actorName);

  const starredMovies = movies.filter((movie) =>
    movie.actors.includes(selectedActor.name)
  );

  return (
    <Row className="justify-content-center">
      <Col md={4} className="mb-4">
        <img
          src={selectedActor.image}
          className="w-100 rounded"
          alt={`${selectedActor.name} poster`}
        />
      </Col>

      <Col>
        <Row className="h-50 align-content-start">
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="fw-bold">{selectedActor.name}</h1>
            </div>
            <hr />
            <div>Born: {selectedActor.birth}</div>
            {selectedActor.death !== null && (
              <div>Died: {selectedActor.death}</div>
            )}
            <br />
            <div>{selectedActor.bio}</div>
          </Col>
        </Row>
        <Row className="h-50 d-flex align-content-end pb-4">
          <div className="d-flex justify-content-between">
            <div className="align-content-end">
              <BackButton />
            </div>
          </div>
        </Row>
        <br />
      </Col>

      <Row className="g-4 mb-5 p-0">
        <h2>Movies</h2>
        {starredMovies.map((movie) => (
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

ActorView.propTypes = {
  onFavToggle: PropTypes.func,
};
