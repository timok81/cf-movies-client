import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavigationBar({ user, onLoggedOut }) {
  return (
    <Navbar data-bs-theme="dark" expand="lg" className="bg-body-tertiary mb-5">
      <Container fluid>
        <Navbar.Brand href="#home">Movie Database</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="ms-auto">
            {!user && (
              <>
                <Nav.Link href="/signup">Sign up</Nav.Link>
                <Nav.Link href="/login">Log in</Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/profile">Profile</Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Log out</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
