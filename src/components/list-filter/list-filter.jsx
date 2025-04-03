import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { setFilter } from "../../redux/reducers/actors";
import { useDispatch } from "react-redux";
import Row from "react-bootstrap/Row";
import { Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

export const ListFilter = ({ contentType }) => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  let placeHolder = "Search...";

  if (contentType === "movies") {
    placeHolder = "Search for movies and genres...";
  }

  if (contentType === "actors") {
    placeHolder = "Search for actors...";
  }

  if (contentType === "directors") {
    placeHolder = "Search for directors...";
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (contentType === "movies") {
      if (location.pathname !== "/movies") navigate("/movies");
    }

    if (contentType === "actors") {
      if (location.pathname !== "/actors") navigate("/actors");
    }

    if (contentType === "directors") {
      if (location.pathname !== "/directors") navigate("/directors");
    }

    dispatch(setFilter(inputValue));
  };

  return (
    <Row>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="d-flex gap-2">
          <Form.Control
            md={4}
            type="text"
            placeholder={placeHolder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button variant="secondary" type="submit">
            Search
          </Button>
        </Form.Group>
      </Form>
    </Row>
  );
};
