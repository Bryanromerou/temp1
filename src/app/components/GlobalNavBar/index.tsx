/**
 *
 * GlobalNavBar
 *
 */
import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

interface Props {}

export default function GlobalNavBar(props: Props) {
  return (
    <Navbar className="global-nav-bar" variant="dark">
      <Container>
        <Navbar.Brand href="/">Criteria</Navbar.Brand>
        <Nav>
          <Nav.Link as={Link} to="/">
            My Dashboard
          </Nav.Link>
          <Nav.Link as={Link} to="/TeamGuide">
            My Teams
          </Nav.Link>
          <Nav.Link as={Link} to="/AdminConsole">
            Admin Console
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
