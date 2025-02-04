import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import { setFilter } from "../../redux/reducers/genres";

export const GenreFilter = () => {
  const filter = useSelector((state) => state.genres.filter);
  const dispatch = useDispatch();

  return (
    <Form.Control
      md={4}
      type="text"
      placeholder="Search for a genre"
      value={filter}
      onChange={(e) => dispatch(setFilter(e.target.value))}
    />
  );
};
