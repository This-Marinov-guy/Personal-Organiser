import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { logout, selectUser } from "src/redux/user";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const NavBar = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Navbar fixed="top" bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/"><i style={{fontSize:'1.8rem'}} className="fa-solid fa-diagram-project"></i></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {user.token && (
            <Nav className="me-auto">
              <Nav.Link href={`/my-projects/${user.userId}`}>Projects</Nav.Link>
              <Nav.Link href="/add-project">Add Project</Nav.Link>
              <NavDropdown title="User" id="navbarScrollingDropdown">
                <NavDropdown.Item href={`/user/${user.userId}`}>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item href="/chats">Chats</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
          {user.token ? (
            <Button href="/" onClick={logoutHandler} variant="outline-primary">
              Log Out
            </Button>
          ) : (
            <Button href="/login" variant="outline-primary">
              Log in
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
