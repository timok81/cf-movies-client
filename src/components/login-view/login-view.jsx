import { useState } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../redux/reducers/user/user";
import { toast } from "react-toastify";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(
      `https://moviemovie-7703363b92cb.herokuapp.com/login?Username=${username}&Password=${password}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          dispatch(setUser(data.user));
          dispatch(setToken(data.token));
          window.location.reload();
        } else {
          toast.error("Invalid credentials");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="mb-4">Sign in</h3>
      <Form.Group controlId="formUsername">
        <FloatingLabel controlId="userName" label="Username" className="mb-3">
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            pattern="^[a-zA-Z0-9]+$"
            required
            minLength="5"
            placeholder="Username"
            className="mb-3"
          />
        </FloatingLabel>
      </Form.Group>

      <Form.Group controlId="formPassword">
        <FloatingLabel controlId="password" label="Password" className="mb-3">
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            pattern="^\S+$"
            required
            minLength="8"
            placeholder="Password"
            className="mb-4"
          />
        </FloatingLabel>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </form>
  );
};

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};
