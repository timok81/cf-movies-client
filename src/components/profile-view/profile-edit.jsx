import "./profile-view.scss";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Toast } from "react-bootstrap";
import "./profile-view.scss";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user/user";

export const ProfileEdit = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday.slice(0, 10));
  const [focus, setFocus] = useState(null);
  console.log("birthday: ", user.Birthday);
  const [showToastSuccess, setShowToastSuccess] = useState(false);
  const [showToastFailure, setShowToastFailure] = useState(false);

  //Try updating user information
  const handleEditSubmit = (
    event,
    username,
    password,
    email,
    birthday,
    handleToast
  ) => {
    event.preventDefault();

    const data = {
      Username: username,
      Email: email,
      ...(password && { Password: password }),
      ...(birthday && { Birthday: birthday }),
    };

    fetch(`https://moviemovie-7703363b92cb.herokuapp.com/users/${user._id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((updatedUser) => {
        if (updatedUser) {
          dispatch(setUser(updatedUser));
          localStorage.setItem("user", JSON.stringify(updatedUser));
          handleToast(true);
        }
      })
      .catch((err) => {
        console.error("Request failed:", err);
        handleToast(false);
      });
  };

  const handleToast = (success) => {
    if (success) {
      setShowToastSuccess(true);
      setTimeout(() => setShowToastSuccess(false), 3000);
    } else {
      setShowToastFailure(true);
      setTimeout(() => setShowToastFailure(false), 3000);
    }
  };

  return (
    <form
      onSubmit={(event) =>
        handleEditSubmit(
          event,
          username,
          password,
          email,
          new Date(birthday).toISOString(),
          handleToast
        )
      }
    >
      <h2 className="mb-3">Edit profile</h2>

      <div role="alert" aria-live="polite" aria-atomic="true">
        <Toast
          show={showToastSuccess}
          onClose={() => setShowToastSuccess(false)}
          className="position-absolute top-0 end-0 p-2 text-bg-success"
          style={{ zIndex: 5 }}
        >
          <Toast.Body>Profile updated successfully!</Toast.Body>
        </Toast>

        <Toast
          show={showToastFailure}
          onClose={() => setShowToastFailure(false)}
          className="position-absolute top-0 end-0 p-2 text-bg-danger"
          style={{ zIndex: 5 }}
        >
          <Toast.Body>Unable to update profile</Toast.Body>
        </Toast>
      </div>

      <Form.Group controlId="formUsername">
        <Form.Label>Change username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          pattern="^[a-zA-Z0-9]+$"
          minLength="5"
          placeholder="Username"
          className="mb-3"
          aria-describedby="usernameHelpBlock"
          onFocus={() => setFocus("username")}
          onBlur={() => setFocus(null)}
        />
        <Form.Text id="usernameHelpBlock" muted>
          {focus === "username" &&
            "Your username must be at least 5 characters long and may only contain letters and numbers."}
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Change password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          pattern="^\S+$"
          minLength="8"
          placeholder="New password"
          className="mb-4"
          aria-describedby="passwordHelpBlock"
          onFocus={() => setFocus("password")}
          onBlur={() => setFocus(null)}
        />
        <Form.Text id="passwordHelpBlock" muted>
          {focus === "password" &&
            "Your password must have at least 8 characters and may not contain spaces."}
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Change e-mail:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="mb-3"
          aria-describedby="emaildHelpBlock"
          onFocus={() => setFocus("email")}
          onBlur={() => setFocus(null)}
        />
        <Form.Text id="emaildHelpBlock" muted>
          {focus === "email" && "Your email must be valid."}
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBirthday">
        <Form.Label>Change birthday:</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          className="mb-4"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Save changes
      </Button>
      {/* {updateSuccess && (
        <p
          style={{ color: "SeaGreen" }}
          className="account-update-notification mb-0"
        >
          <strong>Account information updated</strong>
        </p>
      )} */}
    </form>
  );
};

ProfileEdit.propTypes = {
  handleEditSubmit: PropTypes.func,
};
