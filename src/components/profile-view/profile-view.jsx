import PropTypes from "prop-types";
import { useState } from "react";
import "./profile-view.scss";
import { ProfileEdit } from "./profile-edit";
import { MovieCard } from "../movie-card/movie-card";
import { Row, Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";

export const ProfileView = ({
  user,
  movies,
  token,
  onFavToggle,
  onDeleteAccount,
}) => {
  const [open, setOpen] = useState(false);

  if (!user) {
    return <p>Loading user data...</p>;
  }
  let favMovies = movies.filter((movie) =>
    user.FavouriteMovies.includes(movie.id)
  );

  return (
    <Row className="justify-content-center">
      <Col xs={10} sm={8} md={8} lg={6}>
        <h1>{user.Username}</h1>
        <h2>{user.Email}</h2>
        <br />
        <>
          <Button
            onClick={() => setOpen(!open)}
            aria-controls="confirm-collapse"
            aria-expanded={open}
            variant="secondary"
            className="mb-2"
          >
            {open ? "Cancel" : "Delete account"}
          </Button>
          <Collapse in={open}>
            <div id="confirm-collapse">
              <Card body>
                Are you sure you want to delete this account?
                <br />
                <br />
                <Button variant="danger" onClick={onDeleteAccount}>
                  Delete account
                </Button>
              </Card>
            </div>
          </Collapse>
        </>
        <hr />
        <br />
        <Col>
          <ProfileEdit user={user} token={token} />
        </Col>
        <br />
        <br />
      </Col>
      <hr />
      <h2 className="mb-0 mt-3">Favourite movies</h2>
      <Row className="g-4 justify-content-center">
        {favMovies.map((movie) => (
          <Col
            className="mb-4"
            key={movie.id}
            xs={10}
            sm={5}
            md={5}
            lg={4}
            xl={3}
          >
            <MovieCard
              movie={movie}
              isFav={user.FavouriteMovies.includes(movie.id)}
              onFavToggle={onFavToggle}
            />
          </Col>
        ))}
      </Row>
    </Row>
  );
};

ProfileView.propTypes = {
user: PropTypes.object,
movies: PropTypes.array,
token: PropTypes.string,
onFavToggle: PropTypes.func,
onDeleteAccount: PropTypes.func
};
