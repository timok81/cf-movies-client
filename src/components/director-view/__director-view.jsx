import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./director-view.scss";
import { MovieCard } from "../movie-card/movie-card";
import { useSelector } from "react-redux";
import { BackButton } from "../back-button/back-button";

//Displays detailed information
export const DirectorView = ({ onFavToggle }) => {
  const user = useSelector((state) => state.user.user);
  const directors = useSelector((state) => state.directors.list);
  const movies = useSelector((state) => state.movies.list);
  const { directorName } = useParams();
  const selectedDirector = directors.find(
    (director) => director.name === directorName
  );

  const directedMovies = movies.filter(
    (movie) => movie.director === selectedDirector.name
  );

  return (
    <Row className="justify-content-center mx-1">
      <Row className="mb-3">
        <div>
          <div className="d-flex align-items-center">
            <BackButton />
            <h1 className="fw-bold ms-2">{selectedDirector.name}</h1>
          </div>
        </div>
      </Row>

      <Row className="border rounded p-3 movie-view-main">
        <Col md={4} className="">
          <img
            src={selectedDirector.image}
            className="w-100 rounded"
            alt={`${selectedDirector.name} poster`}
          />
        </Col>
        <Col className="p-3">
          <Row className="d-flex align-content-end">
            <Col>
              <div>Born: {selectedDirector.birth}</div>
              {selectedDirector.death !== null && (
                <div>Died: {selectedDirector.death}</div>
              )}
              <br />
              <div>{selectedDirector.bio}</div>
            </Col>
          </Row>
          <br />
        </Col>
      </Row>

      <Row className="g-4 mb-5 p-0">
        <h2>Movies</h2>
        {directedMovies.map((movie) => (
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

DirectorView.propTypes = {
  onFavToggle: PropTypes.func,
};