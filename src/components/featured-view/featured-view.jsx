import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";

//Displays detailed information
export const FeaturedView = ({ onFavToggle }) => {
  const user = useSelector((state) => state.user.user);
  const movies = useSelector((state) => state.movies.list);

  const featuredMovie = movies.find((movie) => movie.featured === true);
  
  const isFav = user?.FavouriteMovies?.includes(featuredMovie.id) || false;

  return (
    <Row className="justify-content-center mx-1">
      
      <Row className="rounded p-3 featured-movie">
        <Col className="p-3">
          <Row className="mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="fw-bold ms-2">{featuredMovie.name}</h1>
              <h2 className="text-muted">{featuredMovie.released}</h2>
            </div>
          </Row>

          <Row>
            <Col>
              <div>{featuredMovie.description}</div>
            </Col>
          </Row>
          <br />
        </Col>
      </Row>
    </Row>
  );
};
