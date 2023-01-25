import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { fake_db, availableTypes } from "utils/fakeDB";
import ModuleCard from "./ModuleCard";
import ModuleTypeCard from "./ModuleTypeCard";

interface Props {
  onAddModule: (moduleId) => void;
}

// This should have two views the first is to select the module type, and the second is all of the available modules for that specific selected type
export default function ModuleLibrary({ onAddModule }: Props) {
  const [selectedModuleType, setSelectedModuleType] = useState<
    "Free Text" | null
  >(null);

  const getModuleCards = () =>
    Object.values(fake_db).map(({ title, moduleType, moduleId }) => (
      <Col key={moduleId}>
        <ModuleCard
          title={title}
          moduleType={moduleType}
          moduleId={moduleId}
          onAddModule={onAddModule}
        />
      </Col>
    ));

  const getModuleTypeCards = () =>
    availableTypes.map(moduleType => (
      <ModuleTypeCard
        moduleType={moduleType}
        onSelectModuleType={setSelectedModuleType}
      />
    ));

  return (
    <Col className="module-library">
      {selectedModuleType !== null ? (
        <>
          <Row className="m-auto">
            <h2>{selectedModuleType} Library</h2>
          </Row>
          <Row className="m-auto">{getModuleCards()}</Row>
        </>
      ) : (
        <>
          <Row className="m-auto">
            <h2>Module Library</h2>
          </Row>
          <Row className="m-auto"> {getModuleTypeCards()}</Row>
        </>
      )}
    </Col>
  );
}
