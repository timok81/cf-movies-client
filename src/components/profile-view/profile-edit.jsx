import "./profile-view.scss";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Toast } from "react-bootstrap";
import "./profile-view.scss";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

export const ProfileEdit = ({ handleEditSubmit }) => {
  const user = useSelector((state) => state.user.user);
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState("");
  const [focus, setFocus] = useState(null);

  const [showToastSuccess, setShowToastSuccess] = useState(false);
  const [showToastFailure, setShowToastFailure] = useState(false);

  const handleEdit = (success) => {
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
        handleEditSubmit(event, username, password, email, birthday, handleEdit)
      }
    >
      <h2 className="mb-3">Edit profile</h2>

      <div
        role="alert"
        aria-live="polite"
        aria-atomic="true"
      >
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
