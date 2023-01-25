import React from "react";
import { Col, Row, Card, Navbar, Nav, Container } from "react-bootstrap";

interface Props {
  name: string;
  description: string;
  totalMembers?: number;
  type: "user" | "team";
  // tabs: string[];
  // activeTab: string | null;
}

export default function GuideHeader({
  name,
  description,
  type,
  totalMembers
}: Props) {
  const getInitials = () => {
    let initials = "";
    name.split(" ").forEach(word => {
      initials += word[0];
    });
    return initials;
  };

  return (
    <Card className="guide-header-card">
      <Row className="m-3">
        <Col xs="1">
          <div className="guide-header-circle">
            <span>{getInitials()}</span>
          </div>
        </Col>
        <Col>
          <Row className="mb-2">
            <h1 className="guide-header-title me-2">
              {name} {type === "team" ? "Team" : null}
            </h1>
            {type === "team" && totalMembers ? (
              <span className="guide-header-total-members">
                {totalMembers} Members
              </span>
            ) : null}
          </Row>
          <Row>{description}</Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <Navbar
            bg="light"
            variant="light"
            style={{ width: "100%", paddingBottom: 0 }}
          >
            <Container>
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#features">About</Nav.Link>
                <Nav.Link href="#pricing">Team Personality</Nav.Link>
                <Nav.Link href="#pricing">Tasks</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </Col>
      </Row>
    </Card>
  );
}
