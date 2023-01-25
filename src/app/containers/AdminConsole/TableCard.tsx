import React, { useState, ReactElement } from "react";
import {
  faCaretUp,
  faCaretDown,
  faUpload,
  faDownload
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Collapse, Button, Table } from "react-bootstrap";
import { TableData, TableColumns } from "./types";

interface Props {
  // tagName: string;
  tableName: string;
  tableDescription: string;
  tableColumns: TableColumns;
  tableData: TableData;
  rowsAdded?: number;
  structureSuccess?: boolean;
  structureError?: {
    existingColumns: string[];
    uploadedColumns: string[];
    mismatchPositions: number[];
  } | null;
  onUploadClick?: (tableName) => void;
  onDownloadClick?: (tableName) => void;
}

export default function TableCard({
  // tagName,
  tableName,
  tableDescription,
  tableColumns,
  tableData,
  onUploadClick,
  onDownloadClick
}: Props) {
  const [viewPreview, setViewPreview] = useState(false);

  const getTablePreview = () => {
    const tableHeaders: ReactElement[] = [];
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

    tableColumns.forEach((columnName, idx) => {
      tableHeaders.push(
        <th key={idx} className="admin-console-table-header">
          {columnName}
        </th>
      );
    });
    return (
      <>
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
      <p>Table Description - {tableDescription}</p>
      {getTablePreview()}
      <p>
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
