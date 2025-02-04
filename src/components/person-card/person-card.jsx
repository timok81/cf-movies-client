import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./person-card.scss";

//Displays person list item
export const PersonCard = ({ person, type }) => {
  let dir;
  if (type === "actor") dir = "actors";
  else if (type === "director") dir = "directors";

  return (
    <Link to={`/${dir}/${encodeURIComponent(person.name)}`}>
      <Card className="h-100 person-card border-0">
        <div className="image-wrapper">
          <Card.Img variant="top" src={person.image} />
        </div>
        <Card.Body className="mb-0 text-center">
          <Card.Title>{person.name}</Card.Title>
        </Card.Body>
      </Card>
    </Link>
  );
};

PersonCard.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
    bio: PropTypes.string,
    birth: PropTypes.string,
    death: PropTypes.array,
  }).isRequired,
  type: PropTypes.bool,
};
