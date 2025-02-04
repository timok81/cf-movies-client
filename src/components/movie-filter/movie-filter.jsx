import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import { setFilter } from "../../redux/reducers/movies";

export const MovieFilter = () => {
  const filter = useSelector((state) => state.movies.filter);
  const dispatch = useDispatch();

  return (
    <Form.Control
      md={4}
      type="text"
      placeholder="Search for a movie or genre"
      value={filter}
      onChange={(e) => dispatch(setFilter(e.target.value))}
    />
  );
};
