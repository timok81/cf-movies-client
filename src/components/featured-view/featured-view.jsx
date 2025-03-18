import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { MovieCard } from "../movie-card/movie-card";

//Displays detailed information
export const FeaturedView = ({ onFavToggle }) => {
  const user = useSelector((state) => state.user.user);
  const movies = useSelector((state) => state.movies.list);

  const featuredMovie = movies.find((movie) => movie.featured === true);

  // const isFav = user?.FavouriteMovies?.includes(featuredMovie.id) || false;

  return (
    <Row>
      <Row><h1>Featured movie</h1></Row>
      <Row className="justify-content-center mx-1 mb-5">
        <Col className="ratio ratio-16x9 p-0 m-0">
          <iframe
            width="1250"
            height="703"
            src="https://www.youtube.com/embed/2LqzF5WauAw"
            title="Interstellar Movie - Official Trailer"
            frameborder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
          ></iframe>
        </Col>
      </Row>
    </Row>
  );
};
