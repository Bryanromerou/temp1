import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faCircleXmark
} from "@fortawesome/free-solid-svg-icons";
import {
  Modal as BootstrapModal,
  Alert,
  Container,
  FormGroup,
  FormControl,
  Button
} from "react-bootstrap";
import {
  ModalType,
  TableStructureError,
  UploadState,
  SelectedTable
} from "./types";
import TableCard from "./TableCard";

interface Props {
  modalToShow: ModalType;
  onHide: () => void;
  selectedTable: SelectedTable;
  handleUpload: (handleUpload) => void;
  structureError: TableStructureError;
  uploadState: UploadState;
  onSendData: () => void;
}

export default function Modal({
  modalToShow,
  onHide,
  selectedTable,
  handleUpload,
  structureError,
  uploadState,
  onSendData
}: Props) {
  const getModalContent = () => {
    switch (modalToShow) {
      case "UploadData":
        return (
          <>
            <h2>Upload Data</h2>
            {getUploadDataContent()}
          </>
        );
      default:
        return null;
    }
  };

  const getUploadDataContent = () => {
    if (uploadState === "SendingError") {
      return (
        <>
          <FontAwesomeIcon icon={faCircleXmark} color="red" />
          <p>Update was not successful, please try again</p>
        </>
      );
    }

    if (uploadState === "SendingSuccess") {
      return (
        <>
          <FontAwesomeIcon icon={faCheckCircle} color="green" />
          <p>Update has been successfully completed</p>
        </>
      );
    }

    return (
      <>
        <Alert variant={"warning"}>
          <p className="mb-0">
            To update existing data tables (adding new rows, editing existing
            content, etc.), select an existing table and upload the updated .csv
            file with the same header names and number of headers.
          </p>
          <p className="mb-0">
            Note: This will not interrupt any existing users in their sessions,
            but will take effect for any new sessions.
          </p>
        </Alert>

        <h3>Upload a Data File (.csv)</h3>
        <FormGroup>
          <FormControl
            id="fileUpload"
            className="csv-upload"
            type="file"
            accept=".csv"
            onChange={handleUpload}
          />
        </FormGroup>
        <p style={{ color: "#86888b", marginTop: "10px" }}>
          File size limit: 5 MB
        </p>

        <h3 className="mb-3">
          {structureError ? "Table Structure Check" : "Table You Are Changing:"}
        </h3>
        {selectedTable && (
          <TableCard
            tableColumns={selectedTable.tableColumns}
            tableData={selectedTable.tableData}
            tableName={selectedTable.tableName}
            tableDescription={selectedTable.tableDescription}
            structureError={structureError}
            uploadState={uploadState}
          />
        )}
        <div className="mt-2">
          <Button
            className="me-2"
            disabled={uploadState !== "CheckingSuccess"}
            onClick={() => {
              onSendData();
            }}
          >
            Upload Data
          </Button>
          <Button
            variant="outline-primary"
            className="me-2"
            onClick={() => {
              onHide();
            }}
          >
            Cancel
          </Button>
        </div>
      </>
    );
  };

  return (
    <BootstrapModal size={"lg"} onHide={onHide} show={modalToShow !== null}>
      <Container className="p-4">{getModalContent()}</Container>
    </BootstrapModal>
  );
}
