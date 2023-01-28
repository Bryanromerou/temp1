/**
 *
 * GlobalNavBar
 *
 */
import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import PlaceHolderIcon from "resources/images/criteria-logo.png";

interface Props {}

export default function GlobalNavBar(props: Props) {
  return (
    <Navbar className="global-nav-bar py-0" variant="dark">
      <Container fluid>
        <Navbar.Brand href="/">
          <img
            src={PlaceHolderIcon}
            alt="Criteria"
            style={{ width: "110px", height: "27px" }}
          />
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/">
            My Dashboard
          </Nav.Link>
          <Nav.Link as={NavLink} to="/TeamGuide">
            My Teams
          </Nav.Link>
          <Nav.Link as={NavLink} to="/AdminConsole">
            Admin Console
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
