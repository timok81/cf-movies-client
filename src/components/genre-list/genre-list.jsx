import React from "react";
import { useSelector } from "react-redux";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { GenreCard } from "../genre-card/genre-card";
import { GenreFilter } from "../genre-filter/genre-filter";

export const GenreList = () => {
  const genres = useSelector((state) => state.genres.list);

  const filter = useSelector((state) => state.genres.filter)
    .trim()
    .toLowerCase();
  const filteredGenres = genres.filter((genre) =>
    genre.name.toLowerCase().includes(filter)
  );

  return (
    <>
      <Row className="justify-content-center mb-5">
        <Col xs={10} sm={8} lg={6}>
          <GenreFilter />
        </Col>
      </Row>
      <Row className="justify-content-center">
        {genres.length === 0 ? (
          <Col className="text-center">Loading genres...</Col>
        ) : (
          filteredGenres.map((genre) => (
            <Col
              className="mb-4"
              key={genre.name}
              xs={10}
              sm={5}
              md={4}
              lg={4}
              xl={3}
            >
              <GenreCard genre={genre}/>
            </Col>
          ))
        )}
      </Row>
    </>
  );
};
