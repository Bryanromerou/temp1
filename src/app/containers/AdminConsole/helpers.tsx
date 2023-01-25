// import React, { ReactElement } from "react";
// import { Table } from "react-bootstrap";
// import { TableColumns, TableData } from "./types";
export const temp = [];
// export const getTablePreview = ({
//   tableColumns,
//   tableData,
//   maxRows = tableData.length
// }: {
//   tableColumns: TableColumns;
//   tableData: TableData;
//   maxRows: number;
// }) => {
//   const tableHeaders: ReactElement[] = [];
//   const tableRows: ReactElement[] = [];

//   tableData.forEach((tableRow, idx) => {
//     if (idx >= maxRows) return;

//     tableRows.push(
//       <tr key={idx}>
//         {tableRow.map((tableData, idy) => (
//           <td key={idy}>{tableData}</td>
//         ))}
//       </tr>
//     );
//   });

//   tableColumns.forEach((columnName, idx) => {
//     tableHeaders.push(
//       <th key={idx} className="admin-console-table-header">
//         {columnName}
//       </th>
//     );
//   });

//   return (
//     <Table bordered>
//       <thead>
//         <tr>{tableHeaders}</tr>
//       </thead>
//       <tbody>{tableRows}</tbody>
//     </Table>
//   );
// };
