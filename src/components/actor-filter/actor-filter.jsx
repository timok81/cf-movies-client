import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import { setFilter } from "../../redux/reducers/actors";

export const ActorFilter = () => {
  const filter = useSelector((state) => state.actors.filter);
  const dispatch = useDispatch();

  return (
    <Form.Control
      md={4}
      type="text"
      placeholder="Search for an actor"
      value={filter}
      onChange={(e) => dispatch(setFilter(e.target.value))}
    />
  );
};
