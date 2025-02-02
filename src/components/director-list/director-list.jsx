import React from "react";
import { useSelector } from "react-redux";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { ActorFilter } from "../actor-filter/actor-filter";
import { PersonCard } from "../person-card/person-card";

export const DirectorList = () => {
  const directors = useSelector((state) => state.directors.list);

  const filter = useSelector((state) => state.directors.filter)
    .trim()
    .toLowerCase();
  const filteredDirectors = directors.filter((director) =>
    director.name.toLowerCase().includes(filter)
  );

  return (
    <>
      <Row className="justify-content-center mb-5">
        <Col xs={10} sm={8} lg={6}>
          <ActorFilter />
        </Col>
      </Row>
      <Row className="justify-content-center">
        {directors.length === 0 ? (
          <Col className="text-center">Loading directors...</Col>
        ) : (
          filteredDirectors.map((director) => (
            <Col
              className="mb-4"
              key={director.name}
              xs={10}
              sm={5}
              md={4}
              lg={3}
              xl={2}
            >
              <PersonCard person={director} type={"director"} />
            </Col>
          ))
        )}
      </Row>
    </>
  );
};
