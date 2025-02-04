import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "./signup-view.scss"

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [focus, setFocus] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch("https://moviemovie-7703363b92cb.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        navigate("/login");
      } else {
        alert("Signup failed");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="mb-4">Create an account</h3>
      <span>Fields marked with * are required</span>
      <br />
      <br />
      <Form.Group controlId="formUsername">
        <FloatingLabel
          controlId="userName"
          label="Username *"
          className="mb-3"
        >
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            pattern="^[a-zA-Z0-9]+$"
            required
            minLength="5"
            placeholder="Username"
            className="mb-3"
            aria-describedby="usernameHelpBlock"
            onFocus={() => setFocus("username")}
            onBlur={() => setFocus(null)}
          />
          <Form.Text id="usernameHelpBlock" muted>
            {focus === "username" && "Your username must be at least 5 characters long and may only contain letters and numbers."}
          </Form.Text>
        </FloatingLabel>
      </Form.Group>

      <Form.Group controlId="formPassword">
        <FloatingLabel
          controlId="password"
          label="Password *"
          className="mb-3"
        >
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            pattern="^\S+$"
            required
            minLength="8"
            placeholder="Password"
            className="mb-4"
            aria-describedby="passwordHelpBlock"
            onFocus={() => setFocus("password")}
            onBlur={() => setFocus(null)}
          />
          <Form.Text id="passwordHelpBlock" muted>
            {focus === "password" && "Your password must have at least 8 characters and may not contain spaces."}
          </Form.Text>
        </FloatingLabel>
      </Form.Group>

      <Form.Group controlId="formEmail">
        <FloatingLabel
          controlId="email"
          label="Email address *"
          className="mb-3"
        >
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
            className="mb-3"
            aria-describedby="emaildHelpBlock"
            onFocus={() => setFocus("email")}
            onBlur={() => setFocus(null)}
          />
          <Form.Text id="emaildHelpBlock" muted>
            {focus === "email" && "Your email must be valid."}
          </Form.Text>
        </FloatingLabel>
      </Form.Group>

      <Form.Group controlId="formBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          className="mb-4"
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="mb-5">
        Create Account
      </Button>
    </form>
  );
};
