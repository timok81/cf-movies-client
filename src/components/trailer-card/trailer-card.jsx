import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

const TrailerCard = ({ movie }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="trailer-card">
        <div
          onClick={handleShow}
          className="trailer-card-image rounded-2 mb-2"
          style={{
            backgroundImage: `url(${movie.image})`,
          }}
        >
          ⯈
        </div>
        <div className="trailer-card-description text-center">
          <h5>{movie.name}</h5>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Body>
          <div className="ratio ratio-16x9 mb-3">
            <iframe
              width="800"
              height="300"
              src={movie.trailer?.Path}
              title={movie.name}
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
          </div>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
        </Modal.Body>
      </Modal>
    </>
  );
};
export default TrailerCard;
