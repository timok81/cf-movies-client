import React from "react";
import { useSelector } from "react-redux";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { PersonCard } from "../person-card/person-card";
import { DirectorFilter } from "../director-filter/director-filter";

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
          <DirectorFilter />
        </Col>
      </Row>
      <Row className="">
        {directors.length === 0 ? (
          <Col className="text-center">Loading directors...</Col>
        ) : (
          filteredDirectors.map((director) => (
            <Col
              className="mb-4"
              key={director.name}
              xs={12}
              sm={6}
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
