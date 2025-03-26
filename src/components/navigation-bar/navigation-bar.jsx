import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { setToken, setUser } from "../../redux/reducers/user/user";

function NavigationBar() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  return (
    <Navbar
      data-bs-theme="dark"
      expand="lg"
      className="bg-body-tertiary mb-5 w-100 navbar"
    >
      <Container fluid>
        <Navbar.Brand href="/">MovieDB</Navbar.Brand>
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
                <Nav.Link href="/">Movies</Nav.Link>
                <Nav.Link href="/genres">Genres</Nav.Link>
                <Nav.Link href="/directors">Directors</Nav.Link>
                <Nav.Link href="/actors">Actors</Nav.Link>
                
                <Nav.Link href={`/profile/${user.Username}`}>Profile</Nav.Link>
                <Nav.Link
                  onClick={() => {
                    dispatch(setUser(null));
                    dispatch(setToken(null));
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Log out
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;

NavigationBar.propTypes = {
  user: PropTypes.object,
  onLoggedOut: PropTypes.func,
};
