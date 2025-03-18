import "./profile-view.scss";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./profile-view.scss";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user/user";
import { toast } from "react-toastify";

export const ProfileEdit = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday.slice(0, 10));
  const [focus, setFocus] = useState(null);

  //Try updating user information
  const handleEditSubmit = (event, username, password, email, birthday) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

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
          toast.success("Account information updated");
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch((err) => {
        console.error("Request failed:", err);
      });
  };

  return (
    <form
      onSubmit={(event) =>
        handleEditSubmit(
          event,
          username,
          password,
          email,
          new Date(birthday).toISOString()
        )
      }
    >
      <h2 className="mb-3">Edit profile</h2>

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
            <div className="mb-2">Your username must be at least 5 characters long and may only contain letters and numbers.</div>}
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
          className="mb-3"
          aria-describedby="passwordHelpBlock"
          onFocus={() => setFocus("password")}
          onBlur={() => setFocus(null)}
        />
        <Form.Text id="passwordHelpBlock" muted>
          {focus === "password" &&
            <div className="mb-3">Your password must have at least 8 characters and may not contain spaces.</div>}
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formConfirmPassword">
        <Form.Control
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setPasswordsMatch(true);
          }}
          pattern="^\S+$"
          minLength="8"
          placeholder="Confirm password"
          className={
            passwordsMatch ? "mb-4" : "mb-4 border border-danger rounded"
          }
          aria-describedby="passwordHelpBlock"
          onFocus={() => setFocus("password")}
          onBlur={() => setFocus(null)}
        />
        <Form.Text id="confirmPasswordHelpBlock" muted >
          {focus === "confirmPassword" &&
            <div className="mb-3">Your password must have at least 8 characters and may not contain spaces.</div>}
        </Form.Text>

        {!passwordsMatch && (
          <div className="mb-3 text-danger">Passwords do not match</div>
        )}
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
          {focus === "email" && <div className="mb-2">Your email must be valid.</div>}
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
  handleEditSubmit: PropTypes.func,
};
