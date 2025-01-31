import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./profile-view.scss";
import PropTypes from "prop-types";

export const ProfileEdit = ({ user, token, handleEditSubmit }) => {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState("");
  const [focus, setFocus] = useState(null);

  return (
    <form onSubmit={(event) => handleEditSubmit(event, username, password, email, birthday)}>
      <h2 className="mb-4">Edit profile</h2>
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
    </form>
  );
};

ProfileEdit.propTypes = {
  user: PropTypes.object,
  token: PropTypes.string,
};
