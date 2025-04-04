import { Row, Col } from "react-bootstrap";

export function Footer() {
  return (
    <Row className="footer py-1 mx-0">
      <Col className="text-end">©Timo Kujansuu 2025</Col>
      <Col className="text-left">
        <a href={`/api-docs`} target="_blank" className="link-light">
          API documentation
        </a>
      </Col>
    </Row>
  );
}
