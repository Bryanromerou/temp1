import React from "react";
import { Form, Card, Col, Row, Button } from "react-bootstrap";

interface Props {
  id: number;
  moduleId: string;
  title: string;
  zeroTextCase?: string;
  instructions: string;
  moduleType: string;
  limits?: number;
  hyperLink?: string;
  length?: number;
  editing: boolean;
  hasLink: boolean;
  freeText: string;
  charLimit: number;
  updateModuleData: (
    moduleId,
    field: "freeText" | "hasLink" | "hyperLink",
    updatedValue
  ) => void;
  moduleCount: number;
  deleteModule: (moduleId) => void;
  isSectionAlreadyCreated: boolean;
}

export default function Module({
  id,
  editing,
  instructions,
  title,
  hasLink,
  moduleType,
  freeText,
  updateModuleData,
  zeroTextCase,
  deleteModule,
  charLimit,
  hyperLink,
  moduleCount,
  isSectionAlreadyCreated
}: Props) {
  const getModuleContent = () => {
    switch (moduleType) {
      case "Free Text":
      case "FreeText":
        return (
          <>
            <Row>
              {editing ? (
                <Form.Group className="w-100 mt-2">
                  <Form.Label>
                    <strong>{instructions}</strong>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder={zeroTextCase || "PlaceHolder"}
                    value={freeText}
                    onChange={event =>
                      updateModuleData(id, "freeText", event.target.value)
                    }
                  />
                  <Form.Text className="text-muted">
                    {freeText.length}/{charLimit} Characters
                  </Form.Text>
                </Form.Group>
              ) : (
                freeText
              )}
            </Row>
            {getLink()}
          </>
        );
      default:
        return null;
    }
  };

  const getLink = () => {
    if (editing) {
      return (
        <Row className="mb-2">
          {hasLink ? (
            <Form.Group className="w-100">
              <Form.Label>Add Link</Form.Label>
              <Form.Control
                placeholder="Enter link"
                value={hyperLink || ""}
                onChange={e =>
                  updateModuleData(id, "hyperLink", e.target.value)
                }
              />
              <Button
                variant="outline-danger"
                onClick={() => updateModuleData(id, "hasLink", false)}
              >
                Remove Link
              </Button>
            </Form.Group>
          ) : (
            <Button
              variant="outline-primary"
              onClick={() => updateModuleData(id, "hasLink", true)}
            >
              + Add Link
            </Button>
          )}
        </Row>
      );
    }

    if (hasLink) {
      return <a href={hyperLink}>{hyperLink}</a>;
    }
  };

  const getHeader = () =>
    editing ? (
      <>
        <Row>Header</Row>
        <Row className="module-title editing">{title}</Row>
      </>
    ) : (
      <Row className="module-title">{title}</Row>
    );

  const getDeleteButton = () => {
    if (!editing) {
      return null;
    }
    return (
      <Row>
        <Button
          variant="outline-danger"
          onClick={() => {
            deleteModule(id);
          }}
        >
          {moduleCount === 1 && isSectionAlreadyCreated
            ? "Discard Module and Card"
            : "Discard Module"}
        </Button>
      </Row>
    );
  };

  return (
    <Card body>
      <Col>
        {getHeader()}
        {getModuleContent()}
        {getDeleteButton()}
      </Col>
    </Card>
  );
}
