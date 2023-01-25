import React from "react";
import {
  Modal as BootstrapModal,
  Alert,
  Container,
  FormGroup,
  FormControl
} from "react-bootstrap";
import { ModalType, TableColumns, TableData } from "./types";
import TableCard from "./TableCard";

interface Props {
  modalToShow: ModalType;
  onHide: () => void;
  selectedTable: {
    tableColumns: TableColumns;
    tableData: TableData;
    tableName: string;
    tableDescription: string;
  } | null;
  handleUpload: (handleUpload) => void;
}

export default function Modal({
  modalToShow,
  onHide,
  selectedTable,
  handleUpload
}: Props) {
  const getModalContent = () => {
    switch (modalToShow) {
      case "UploadData":
        return (
          <>
            <h2>Upload Data</h2>
            <Alert variant={"warning"}>
              <p className="mb-0">
                To update existing data tables (adding new rows, editing
                existing content, etc.), select an existing table and upload the
                updated .csv file with the same header names and number of
                headers.
              </p>
              <p className="mb-0">
                Note: This will not interrupt any existing users in their
                sessions, but will take effect for any new sessions.
              </p>
            </Alert>
            {handleUpload ? (
              <>
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
              </>
            ) : null}
            <h3 className="mb-3">Table You Are Changing: </h3>
            {selectedTable && (
              <TableCard
                tableColumns={selectedTable.tableColumns}
                tableData={selectedTable.tableData}
                tableName={selectedTable.tableName}
                tableDescription={selectedTable.tableDescription}
              />
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <BootstrapModal size={"lg"} onHide={onHide} show={modalToShow !== null}>
      <Container className="p-4">{getModalContent()}</Container>
    </BootstrapModal>
  );
}
