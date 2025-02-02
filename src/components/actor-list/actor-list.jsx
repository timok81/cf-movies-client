import React from "react";
import { useSelector } from "react-redux";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { ActorFilter } from "../actor-filter/actor-filter";
import { PersonCard } from "../person-card/person-card";

export const ActorList = () => {
  const actors = useSelector((state) => state.actors.list);

  const filter = useSelector((state) => state.actors.filter)
    .trim()
    .toLowerCase();
  const filteredActors = actors.filter((actor) =>
    actor.name.toLowerCase().includes(filter)
  );

  return (
    <>
      <Row className="justify-content-center mb-5">
        <Col xs={10} sm={8} lg={6}>
          <ActorFilter />
        </Col>
      </Row>
      <Row className="justify-content-center">
        {actors.length === 0 ? (
          <Col className="text-center">Loading actors...</Col>
        ) : (
          filteredActors.map((actor) => (
            <Col
              className="mb-4"
              key={actor.id}
              xs={10}
              sm={5}
              md={4}
              lg={3}
              xl={2}
            >
              <PersonCard person={actor} type={"actor"}/>
            </Col>
          ))
        )}
      </Row>
    </>
  );
};
