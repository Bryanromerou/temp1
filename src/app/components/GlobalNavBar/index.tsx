/**
 *
 * GlobalNavBar
 *
 */
import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

interface Props {}

export default function GlobalNavBar(props: Props) {
  return (
    <Navbar className="global-nav-bar" variant="dark">
      <Container>
        <Navbar.Brand href="/">Criteria</Navbar.Brand>
        <Nav>
          <Nav.Link href="/">My Dashboard</Nav.Link>
          <Nav.Link href="/TeamGuide">My Teams</Nav.Link>
          {/* <Nav.Link href="#pricing">Admin Console</Nav.Link> */}
        </Nav>
      </Container>
    </Navbar>
  );
}
