import React from "react";
import PlaceHolderIcon from "resources/images/PlaceHolder-DeleteAfter.png";
import { Card, Col, Row } from "react-bootstrap";

interface Props {
  moduleType: string;
  onSelectModuleType: (moduleType) => void;
}

export default function ModuleTypeCard({
  moduleType,
  onSelectModuleType
}: Props) {
  return (
    <Card
      className="module-library-module-card"
      onClick={() => onSelectModuleType(moduleType)}
    >
      <Col className="d-flex flex-column justify-content-around my-2">
        <Row className="m-1">
          <Col>
            <Row className="module-title">{moduleType} Module</Row>
          </Col>
          <Col className="d-flex justify-content-end">
            <img src={PlaceHolderIcon} width="50" height="50" />
          </Col>
        </Row>
      </Col>
    </Card>
  );
}
