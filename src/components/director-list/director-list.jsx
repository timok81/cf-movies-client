import React, { useState } from "react";
import { useSelector } from "react-redux";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { PersonCard } from "../person-card/person-card";
import Pagination from "../pagination/pagination";
import { ListFilter } from "../list-filter/list-filter";
import Spinner from 'react-bootstrap/Spinner';

export const DirectorList = () => {
  const directors = useSelector((state) => state.directors.list);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 12;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = directors.slice(indexOfFirstItem, indexOfLastItem);

  function handlePagination(pageNumber) {
    setCurrentPage(pageNumber);
  }

  const filter = useSelector((state) => state.directors.filter)
    .trim()
    .toLowerCase();

  const filteredDirectors =
    filter === ""
      ? currentItems
      : directors.filter((director) =>
          director.name.toLowerCase().includes(filter)
        );

  return (
    <>
      <Row className="justify-content-center mb-5">
        <Col xs={10} sm={8} lg={6}>
          <ListFilter contentType={"directors"} />
        </Col>
      </Row>

      {filteredDirectors.length === 0 && filter !== "" && (
        <Row>
          <h3 className="text-center">No results</h3>
        </Row>
      )}

      <Row className="">
        {directors.length === 0 ? (
          <Col className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Col>
        ) : (
          <>
            {filteredDirectors.map((director) => (
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
            ))}
            {filteredDirectors.length > 0 && (
              <Pagination
                itemsPerPage={itemsPerPage}
                itemsTotal={
                  filter === "" ? directors.length : currentItems.length
                }
                currentPage={currentPage}
                handlePagination={handlePagination}
              />
            )}
          </>
        )}
      </Row>
    </>
  );
};
