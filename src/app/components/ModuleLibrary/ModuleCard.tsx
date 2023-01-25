import React from "react";
import PlaceHolderIcon from "resources/images/PlaceHolder-DeleteAfter.png";
import { Card, Col, Row, Button, Container } from "react-bootstrap";

interface Props {
  title: string;
  moduleType: string;
  moduleId: string;
  onAddModule: (moduleId) => void;
}

// This card will be only for module Library might want to move ModuleLibrary into its own folder/component.
export default function ModuleCard({
  title,
  moduleType,
  onAddModule,
  moduleId
}: Props) {
  return (
    <Card className="module-library-module-card">
      <Container className="d-flex flex-column justify-content-around my-2">
        <Row className="m-1">
          <Col>
            <Row className="module-title">{title}</Row>
            <Row>
              <div
                className={`module-type ${moduleType.replace(/\s+/g, "")} p-1`}
              >
                {moduleType}
              </div>
            </Row>
          </Col>
          <Col className="d-flex justify-content-end">
            <img src={PlaceHolderIcon} width="50" height="50" />
          </Col>
        </Row>
        <Row className="justify-content-end me-1">
          <Button
            onClick={() => onAddModule(moduleId)}
            variant="outline-primary"
          >
            + Add
          </Button>
        </Row>
      </Container>
    </Card>
  );
}
