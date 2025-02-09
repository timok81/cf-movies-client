import React from "react";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";

export default function Pagination({
  itemsPerPage,
  itemsTotal,
  currentPage,
  handlePagination,
}) {
  let pageNumbers = [];
  let pageRange = 4;

  for (i = 1; i <= Math.ceil(itemsTotal / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  function paginate(pageNumber, e) {
    e.preventDefault();
    if (pageNumber <= 0) pageNumber = 1;
    if (pageNumber >= pageNumbers.length) pageNumber = pageNumbers.length;
    handlePagination(pageNumber);
  }

  return (
    <Col className="text-center mb-4" sm={12}>
      {currentPage !== 1 && (
        <Button
          key={"back-arrow"}
          variant="black"
          className="me-1"
          onClick={(e) => paginate(currentPage - 1, e)}
        >
          🠈
        </Button>
      )}

      {pageNumbers.map((pageNumber) => {
        {
          if (pageNumber === currentPage)
            return (
              <Button
                key={pageNumber}
                variant="outline-dark"
                className="me-1"
                onClick={(e) => paginate(pageNumber, e)}
              >
                {pageNumber}
              </Button>
            );
          else if (pageNumber === 1)
            return (
              <>
                <Button
                  key={pageNumber}
                  variant="link"
                  className="me-1 link-secondary link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover"
                  onClick={(e) => paginate(pageNumber, e)}
                >
                  {pageNumber}
                </Button>
                {currentPage > pageRange + 1 && <> . . . </>}
              </>
            );
          else if (
            pageNumber < currentPage + pageRange &&
            pageNumber > currentPage - pageRange
          )
            return (
              <Button
                key={pageNumber}
                variant={"link"}
                className="me-1 link-secondary link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover"
                onClick={(e) => paginate(pageNumber, e)}
              >
                {pageNumber}
              </Button>
            );
          else if (pageNumber === pageNumbers.length)
            return (
              <>
                {currentPage < pageNumbers.length - pageRange && <> . . . </>}
                <Button
                  key={pageNumber}
                  variant="link"
                  className="me-1 link-secondary link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover"
                  onClick={(e) => paginate(pageNumber, e)}
                >
                  {pageNumber}
                </Button>
              </>
            );
        }
      })}

      {currentPage !== pageNumbers.length && (
        <Button
          key={"forward-arrow"}
          variant="black"
          className="me-1"
          onClick={(e) => paginate(currentPage + 1, e)}
        >
          🠊
        </Button>
      )}
    </Col>
  );
}
