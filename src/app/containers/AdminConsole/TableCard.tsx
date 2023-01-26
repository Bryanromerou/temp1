import React, { useState, ReactElement } from "react";
import {
  faCaretUp,
  faCaretDown,
  faUpload,
  faCheckCircle,
  faDownload
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Collapse, Button, Table, Alert } from "react-bootstrap";
import {
  TableData,
  TableColumns,
  TableStructureError,
  UploadState
} from "./types";

interface Props {
  // tagName: string;
  tableName: string;
  tableDescription: string;
  tableColumns: TableColumns;
  tableData: TableData;
  rowsAdded?: number;
  structureSuccess?: boolean;
  structureError?: TableStructureError;
  onUploadClick?: (tableName) => void;
  onDownloadClick?: (tableName) => void;
  uploadState?: UploadState;
}

export default function TableCard({
  // tagName,
  tableName,
  tableDescription,
  tableColumns,
  tableData,
  onUploadClick,
  onDownloadClick,
  structureError,
  uploadState
}: Props) {
  const [viewPreview, setViewPreview] = useState(false);

  const getTableHeaders = (
    tableColumns: TableColumns,
    mismatchPositions?: number[]
  ): ReactElement[] => {
    const tableHeaders: ReactElement[] = [];
    const copy = mismatchPositions && [...mismatchPositions]; // If this is causing problems just change to use an includes.
    tableColumns.forEach((columnName, idx) => {
      const warning = copy && copy[0] === idx ? "warning" : "";

      tableHeaders.push(
        <th key={idx} className={`admin-console-table-header ${warning}`}>
          {columnName}
        </th>
      );

      if (copy) {
        copy.shift();
      }
    });
    return tableHeaders;
  };

  const getUploadStateComponent = () => {
    switch (uploadState) {
      case "Uploading":
      case "Checking":
        return "Loading...";
      case "CheckingSuccess":
        return (
          <p>
            All column names match
            <FontAwesomeIcon icon={faCheckCircle} color="green" />
          </p>
        );
      case "UploadingError":
        return "We have an oversize error";
      case "CheckingError":
        return getIncorrectStructurePreview();
      default:
        return getDefaultTablePreview();
    }
  };

  const getIncorrectStructurePreview = () => {
    if (!structureError) {
      return null;
    }
    const { existingColumns, uploadedColumns, mismatchPositions } =
      structureError;
    const existingHeaders = getTableHeaders(existingColumns, mismatchPositions);
    const uploadedHeaders = getTableHeaders(uploadedColumns, mismatchPositions);

    return (
      <>
        <Alert variant="danger">
          <p className="mb-0">
            <span className="fw-bold">
              {mismatchPositions.length} column names do not match:
            </span>{" "}
            Please fix these errors and re-upload your file.
          </p>
        </Alert>
        <div style={{ overflowX: "scroll" }}>
          <p>Existing Table</p>
          <Table bordered>
            <thead>
              <tr>{existingHeaders}</tr>
            </thead>
          </Table>
          <p>Uploaded Table</p>
          <Table bordered>
            <thead>
              <tr>{uploadedHeaders}</tr>
            </thead>
          </Table>
        </div>
      </>
    );
  };

  const getDefaultTablePreview = () => {
    const tableHeaders = getTableHeaders(tableColumns);
    const tableRows: ReactElement[] = [];

    tableData.forEach((tableRow, idx) => {
      if (idx >= 2) return;

      tableRows.push(
        <tr key={idx}>
          {tableRow.map((tableData, idy) => (
            <td key={idy}>{tableData}</td>
          ))}
        </tr>
      );
    });

    return (
      <>
        <p>Table Description - {tableDescription}</p>
        <p
          role="button"
          onClick={() => setViewPreview(!viewPreview)}
          className="preview-toggle"
        >
          Table Preview{" "}
          <FontAwesomeIcon
            icon={viewPreview ? faCaretUp : faCaretDown}
            className="ms-1"
          />
        </p>
        <Collapse in={viewPreview}>
          <div style={{ overflowX: "scroll" }}>
            <Table bordered>
              <thead>
                <tr>{tableHeaders}</tr>
              </thead>
              <tbody>{tableRows}</tbody>
            </Table>
          </div>
        </Collapse>
      </>
    );
  };

  return (
    <Card className="admin-console-table-card p-3">
      {/* <span>{tagName}</span> */}
      <h3>{tableName}</h3>
      {getUploadStateComponent()}
      <p>
        {uploadState === "CheckingSuccess" ? "New" : ""}
        Total:{" "}
        <b>
          {tableColumns.length} columns and {tableData.length} rows
        </b>
      </p>
      {onUploadClick && onDownloadClick ? (
        <div>
          <Button className="me-2" onClick={() => onUploadClick(tableName)}>
            <FontAwesomeIcon icon={faUpload} className="me-2" />
            Upload Data
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => onDownloadClick(tableName)}
          >
            <FontAwesomeIcon icon={faDownload} className="me-2" />
            Download Data
          </Button>
        </div>
      ) : null}
    </Card>
  );
}
