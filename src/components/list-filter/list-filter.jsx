import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { setFilter } from "../../redux/reducers/actors";
import { useDispatch } from "react-redux";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";

export const ListFilter = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  return (
    <Col>
      <Form.Group className="d-flex gap-2">
        <Form.Control
          md={4}
          type="text"
          placeholder="Search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button
          variant="primary"
          type="submit"
          onClick={() => dispatch(setFilter(inputValue))}
        >
          Search
        </Button>
      </Form.Group>
    </Col>
  );
};
