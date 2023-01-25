import React, { ReactElement } from "react";
import { Row, Container, Card, Table } from "react-bootstrap";

interface Props {
  tagName: string;
  tableName: string;
  tableDescription: string;
  tableColumns: string[];
  // tableData: string[][]; // If we are interested showing the actual data for the preview then we need to be passing it as props.
  onUploadDataClick: () => void;
}

export default function TableCard({
  tableName,
  tableDescription,
  tableColumns
}: Props) {
  const getTablePreview = () => {
    const tableHeaders: ReactElement[] = [];
    const tableRows: ReactElement[] = [];

    tableColumns.forEach((columnName, idx) => {
      tableHeaders.push(<th key={idx}>{columnName}</th>);
      tableRows.push(<td key={idx}>Row {idx + 1}:1</td>);
    });

    return (
      <Table bordered>
        <thead>
          <tr>{tableHeaders}</tr>
        </thead>
        <tbody>
          <tr>{tableRows}</tr>
        </tbody>
      </Table>
    );
  };

  return (
    <Card>
      <h3>{tableName}</h3>
      <p>{tableDescription}</p>
      <span>Table Preview</span>
      {getTablePreview()}
      TableCard
    </Card>
  );
}
