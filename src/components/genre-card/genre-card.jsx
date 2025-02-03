import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./genre-card.scss";

//Displays genre list item
export const GenreCard = ({ genre }) => {
  return (
    <Link to={`/genres/${encodeURIComponent(genre.name)}`}>
      <Card className="h-100">
        <Card.Body className="m-0 text-center">
          <Card.Title className="m-0">{genre.name}</Card.Title>
        </Card.Body>
      </Card>
    </Link>
  );
};

GenreCard.propTypes = {
  genre: PropTypes.string.isRequired,
};
