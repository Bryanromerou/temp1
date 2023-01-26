import React, { useState } from "react";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Col, Row, Button, Form, Dropdown } from "react-bootstrap";
import { ModuleInterface } from "./types";
import Module from "./Module";
import ModuleLibrary from "app/components/ModuleLibrary/ModuleLibrary";
import { fake_db } from "utils/fakeDB";

interface Props {
  onAddSection: (
    sectionTitle: string | false,
    modules: { [moduleId: string]: ModuleInterface },
    sectionId?: string | number
  ) => void;
  modules?: { [moduleId: string]: ModuleInterface };
  sectionId?: string | number;
  currentModuleId: number;
  hideModal?: () => void;
  isCard?: boolean;
  activeTitle?: string | false;
  onDeleteSection?: (sectionId) => void;
}

// This components should have three states editing, moduleLibrary, default
// editing will make the Modules editable
// If default just show the button that allows to toggle editable
// if the state is moduleLibrary then we display Module Library
// not editing will be how it would look inside of peoples user guides/team guides
export default function Section({
  onAddSection,
  modules,
  sectionId,
  currentModuleId,
  hideModal,
  isCard,
  activeTitle,
  onDeleteSection
}: Props) {
  const [state, setState] = useState<null | "moduleLibrary" | "editing">(null);
  const [nextModuleId, setNextModuleId] = useState(currentModuleId);
  const [currentModules, setCurrentModules] = useState({ ...modules } || {});
  const [title, setTitle] = useState<null | string>(activeTitle || null);
  const [toggle, setToggle] = useState(false);

  const viewModalLibrary = () => {
    setState("moduleLibrary");
  };

  const onAddModule = moduleId => {
    // If the module Id we are trying to add does not exist return early.
    if (!fake_db[moduleId]) {
      return;
    }
    const copy = currentModules;
    copy[nextModuleId] = { ...fake_db[moduleId] };
    copy[nextModuleId].id = nextModuleId;
    setCurrentModules(copy);
    setNextModuleId(nextModuleId + 1);
    setState("editing");
  };

  const hideModalSafely = () => {
    if (hideModal) {
      hideModal();
    }
  };

  const handleSave = () => {
    onAddSection(title || false, currentModules, sectionId);
    setState(null);
  };

  // When canceling nothing will be saved and we should turn the state back to null
  const handleCancel = () => {
    setCurrentModules({ ...modules } || {});
    setNextModuleId(currentModuleId);
    setState(null);
    hideModalSafely();
  };

  const updateModuleData = (
    moduleId,
    field: "hasLink" | "freeText" | "hyperLink",
    updatedValue
  ) => {
    const copy = { ...currentModules };

    // Conditional for any fields that are being updated to boolean
    if (field === "hasLink") {
      copy[moduleId][field] = !!updatedValue;
      setCurrentModules(copy);
    }

    // Conditional for any fields that are being updated to strings
    if (field === "freeText" || field === "hyperLink") {
      copy[moduleId][field] = updatedValue;
      setCurrentModules(copy);
    }

    forceRerender();
  };

  const deleteModule = moduleId => {
    const copy = { ...currentModules };
    delete copy[moduleId];
    setCurrentModules(copy);
  };

  const onDropdownSelect = e => {
    if (e === "edit") {
      setState("editing");
    } else if (e === "add") {
      setState("moduleLibrary");
    } else if (e === "delete" && onDeleteSection) {
      onDeleteSection(sectionId);
    }
  };

  const forceRerender = () => {
    setToggle(!toggle);
  };
  // -------------------------------- Render Getters --------------------------------
  const getTitleSection = () => {
    // For now it is a button but it should be changed to a dropdown that has three options Delete Section, Edit Section, and Add Module. (For now Edit Section and Add Module do the exact same thing)
    if (state !== "editing") {
      return (
        <>
          <Col>
            <h2 className="section-title">{title}</h2>
          </Col>
          <Col className="d-flex justify-content-end">{getDropdown()}</Col>
        </>
      );
    }

    // If editing we always show Save Changes/X and if they have toggled title then they will have the ability to change it
    return (
      <>
        {title === null ? (
          <Col>
            <Button variant="outline-primary" onClick={() => setTitle("")}>
              Add Section Title
            </Button>
          </Col>
        ) : (
          <Col>
            <Form>
              <Form.Group>
                <Form.Label>Section Title</Form.Label>
                <Form.Control
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Section Title"
                />
                <Form.Text className="text-muted">
                  {title.length}/50 Characters
                </Form.Text>
              </Form.Group>
            </Form>
          </Col>
        )}
        <Col xs="2">
          <div
            style={{
              width: "100%",
              height: "32px",
              display: "flex",
              justifyContent: "space-around"
            }}
          >
            <Button onClick={handleSave} variant="outline-primary">
              Save Changes
            </Button>
            <Button onClick={handleCancel} variant="outline-primary">
              X
            </Button>
          </div>
        </Col>
      </>
    );
  };

  const getSectionModules = () =>
    Object.values(currentModules).map(
      ({
        id,
        title,
        hyperLink,
        instructions,
        moduleType,
        hasLink,
        freeText,
        moduleId,
        zeroTextCase,
        charLimit
      }) => {
        return (
          <Module
            moduleId={moduleId}
            id={id}
            title={title}
            hyperLink={hyperLink}
            instructions={instructions}
            hasLink={!!hasLink}
            moduleType={moduleType}
            editing={state === "editing"}
            freeText={freeText || ""}
            updateModuleData={updateModuleData}
            zeroTextCase={zeroTextCase}
            charLimit={charLimit}
            deleteModule={deleteModule}
            isSectionAlreadyCreated={isSectionAlreadyCreated}
            moduleCount={Object.values(currentModules).length}
          />
        );
      }
    );

  const getDropdown = () => (
    <Dropdown onSelect={onDropdownSelect}>
      <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
        ...
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="add">+ Add Module</Dropdown.Item>
        <Dropdown.Item eventKey="edit">Edit Section</Dropdown.Item>
        <Dropdown.Item eventKey="delete">Delete Section</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  const getSectionContent = () => {
    if (Object.keys(currentModules).length === 0 || state === "moduleLibrary") {
      return <ModuleLibrary onAddModule={onAddModule} />;
    }
    return (
      <Col className="my-3">
        <Row>{getTitleSection()}</Row>
        <Row>{getSectionModules()}</Row>
        {state === "editing" ? (
          <Row className="justify-content-center mt-3">
            <Button onClick={viewModalLibrary} variant="outline-primary">
              + Add Module
            </Button>
          </Row>
        ) : null}
      </Col>
    );
  };

  // -------------------------------- Start if Return Section --------------------------------

  const isSectionAlreadyCreated = !isNaN(Number(sectionId)); // When the DB is set up, will replace this with just exist no need to check if its a number.
  return (
    <>
      {/* {isSectionAlreadyCreated && state !== "editing" ? (
        <FontAwesomeIcon
          icon={faGripVertical}
          style={{ height: "24px", width: "16px" }}
          className="px-0"
        />
      ) : null} */}
      {isCard ? (
        <Card className="mb-3">{getSectionContent()}</Card>
      ) : (
        <>{getSectionContent()}</>
      )}
    </>
  );
}
