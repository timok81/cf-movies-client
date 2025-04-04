import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { useSelector } from "react-redux";
import { BackButton } from "../back-button/back-button";

//Displays detailed information
export const GenreView = ({ onFavToggle }) => {
  const user = useSelector((state) => state.user.user);
  const genres = useSelector((state) => state.genres.list);
  const movies = useSelector((state) => state.movies.list);
  const { genreName } = useParams();
  const selectedGenre = genres.find((genre) => genre.name === genreName);

  const genreMovies = movies.filter(
    (movie) => movie.genre === selectedGenre.name
  );

  return (
    <Row className="justify-content-center">
      <Col>
        <Row className="align-content-start">
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <BackButton />
                <h1 className="fw-bold ms-2">{selectedGenre.name}</h1>
              </div>
            </div>

            <br />
            <div className="p-0">{selectedGenre.description}</div>
          </Col>
        </Row>
        <br />
        <hr />
      </Col>

      <Row className="g-4 mb-5 p-0">
        <h2>Movies in genre</h2>
        {genreMovies.map((movie) => (
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

GenreView.propTypes = {
  onFavToggle: PropTypes.func,
};
