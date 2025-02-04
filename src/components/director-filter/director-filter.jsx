import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import { setFilter } from "../../redux/reducers/directors";

export const DirectorFilter = () => {
  const filter = useSelector((state) => state.directors.filter);
  const dispatch = useDispatch();

  return (
    <Form.Control
      md={4}
      type="text"
      placeholder="Search for a director"
      value={filter}
      onChange={(e) => dispatch(setFilter(e.target.value))}
    />
  );
};
