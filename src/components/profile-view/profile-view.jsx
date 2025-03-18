import PropTypes from "prop-types";
import { useState } from "react";
import "./profile-view.scss";
import { ProfileEdit } from "./profile-edit";
import { MovieCard } from "../movie-card/movie-card";
import { Row, Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";
import { useSelector, useDispatch } from "react-redux";
import { setToken, setUser } from "../../redux/reducers/user/user";

export const ProfileView = ({
  onFavToggle,
  handleEditSubmit,
}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const movies = useSelector((state) => state.movies.list);
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token)
  let favMovies = movies.filter((movie) =>
    user.FavouriteMovies.includes(movie.id)
  );
  
  //Try to delete account
  function handleDeleteAccount() {
    fetch(`https://moviemovie-7703363b92cb.herokuapp.com/users/${user._id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      if (response.ok) {
        dispatch(setUser(null));
        dispatch(setToken(null));
        localStorage.clear();
        window.location.reload();
      } else {
        alert("Failed to delete account");
      }
    })
    .catch((err) => console.error("Request failed:", err));
  }
  
  
    if (!user) {
      return <p>Loading user data...</p>;
    }
  
  return (
    <Row className="justify-content-center">
      <Col xs={10} sm={8} md={8} lg={6}>
        <h1>{user.Username}</h1>
        <h2 className="mb-4">{user.Email}</h2>
        <>
          <Button
            onClick={() => setOpen(!open)}
            aria-controls="confirm-collapse"
            aria-expanded={open}
            variant="outline-secondary"
            className="mb-2"
          >
            {open ? "Cancel" : "Delete account..."}
          </Button>
          <Collapse in={open}>
            <div id="confirm-collapse">
              <Card body>
                Are you sure you want to delete this account?
                <br />
                <br />
                <Button variant="danger" onClick={handleDeleteAccount}>
                  Delete account
                </Button>
              </Card>
            </div>
          </Collapse>
        </>
        <hr />
        <Col>
          <ProfileEdit handleEditSubmit={handleEditSubmit} />
        </Col>
        <br />
        <br />
        <hr />
      </Col>
      <h2 className="mb-0 mt-3 text-center">Favourite movies</h2>
      <Row className="g-4 justify-content-center">
        {favMovies.map((movie) => (
          <Col
            className="mb-5"
            key={movie.id}
            xs={10}
            sm={8}
            md={6}
            lg={4}
            xl={3}
          >
            <MovieCard
              movie={movie}
              isFav={user?.FavouriteMovies?.includes(movie.id)}
              onFavToggle={() => onFavToggle(movie.id, user)}
            />
          </Col>
        ))}
      </Row>
    </Row>
  );
};

ProfileView.propTypes = {
  onFavToggle: PropTypes.func,
  onDeleteAccount: PropTypes.func,
  handleEditSubmit: PropTypes.func,
};
