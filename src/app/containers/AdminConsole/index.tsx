/**
 *
 * AdminConsole
 *
 */

import React, { useState } from "react";
import { Container, Card } from "react-bootstrap";
import { parse } from "papaparse";
import { getAvailableTables } from "utils/fakeDB";
// import { useSelector, useDispatch } from 'react-redux';

// import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
// import { reducer, sliceKey } from './slice';
// import { selectAdminConsole } from './selectors';
// import { adminConsoleSaga } from "./saga";
import { ModalType, TableColumns, TableData } from "./types";
import TableCard from "./TableCard";
import Modal from "./Modal";

interface Props {}

export default function AdminConsole(props: Props) {
  // useInjectReducer({ key: sliceKey, reducer: reducer });
  //   useInjectSaga({ key: sliceKey, saga: adminConsoleSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const adminConsole = useSelector(selectAdminConsole);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const dispatch = useDispatch();
  const tables = getAvailableTables();

  const [modalShowing, setModalShowing] = useState<ModalType>(null);
  const [selectedTable, setSelectedTable] = useState<{
    tableColumns: TableColumns;
    tableData: TableData;
    tableName: string;
    tableDescription: string;
  } | null>(null);
  const [uploadError, setUploadError] = useState<"OversizeCSV" | null>(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadedTable, setUploadedTable] = useState<TableData | null>(null);

  const onUploadDataClick = tableName => {
    if (!tables[tableName]) return null;
    setModalShowing("UploadData");
    setSelectedTable({
      tableColumns: tables[tableName].tableColumns,
      tableData: tables[tableName].tableData,
      tableName: tables[tableName].tableName,
      tableDescription: tables[tableName].tableDescription
    });
  };

  const hideModal = () => {
    setModalShowing(null);
  };

  const downloadTableCSV = tableName => {
    if (!tables[tableName]) return null;

    console.log("Downloading the CSV");
    const tableData = [...tables[tableName].tableData];
    tableData.unshift(tables[tableName].tableColumns);
    downloadCSV(tableName, tableData);
  };

  const downloadCSV = (tableName: string, tableData: string[][]) => {
    // this version of the function should work for all browsers
    const csv = convertArrayOfArraysToCSV(tableData);
    if (csv === null) {
      return null;
    }

    const filename = `${tableName}.csv`;

    const BOM = new Uint8Array([0xef, 0xbb, 0xbf]); // Enforces UTF-8 encoding
    const blob = new Blob([BOM, csv], { type: "text/csv;" });

    const link = document.createElement("a");
    if (link.download !== undefined) {
      // feature detection, Browsers that support HTML5 download attribute
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const convertArrayOfArraysToCSV = (data: string[][]) => {
    if (data == null || !data.length) {
      return null;
    }

    const columnDelimiter = ",";
    const lineDelimiter = "\n";

    let idx = 0;
    let result = "";
    data.forEach(row => {
      idx = 0;
      row.forEach(item => {
        if (idx > 0) {
          result += columnDelimiter;
        }
        let itemToDisplay = item;
        if (item === null || item === undefined || typeof item !== "string") {
          itemToDisplay = "-";
        }
        // itemToDisplay = itemToDisplay.replace(/"/g, "'");

        result += `"${itemToDisplay}"`;
        idx += 1;
      });
      result += lineDelimiter;
    });
    return result;
  };

  // Validating csv upload, checking header and setting new users in state
  const handleUpload = event => {
    // let headers = [];
    setUploadingFile(true);

    const uploadFileIsCSV =
      event.target.files.length > 0 &&
      /.+(.csv)$/.test(event.target.files[0].name);

    if (uploadFileIsCSV && event.target.files[0].size > 5 * 1024 * 1024) {
      setUploadError("OversizeCSV");
    } else if (uploadFileIsCSV) {
      parse(event.target.files[0], {
        delimiter: "",
        chunkSize: 3,
        header: true,
        complete: checkTableStructure,
        error: onCSVUploadError
      });
    }
  };

  const onCSVUploadError = (err, file, inputElem, reason) => {
    console.error(
      "err, file, inputElem, reason:",
      err,
      file,
      inputElem,
      reason
    );
  };

  const checkTableStructure = ({ data, meta: { fields } }) => {
    if (!selectedTable) {
      setUploadError("OversizeCSV"); // Should change upload error.
      return;
    }

    const mismatchPositions: number[] = [];
    selectedTable.tableColumns.forEach((columnHeader, idx) => {
      if (columnHeader !== fields[idx]) {
        mismatchPositions.push(idx);
      }
    });

    if (mismatchPositions.length === 0) {
      console.log("matching");
    } else {
      console.log("Sorry does not match");
    }
    console.log("selectedTable:", selectedTable.tableColumns);
    console.log(fields);

    setUploadedTable(data);
  };

  const getTableCards = () =>
    Object.values(tables).map(
      ({ tableName, tableDescription, tableColumns, tableData }, idx) => (
        <TableCard
          // tagName={tagName}
          tableName={tableName}
          tableDescription={tableDescription}
          tableColumns={tableColumns}
          onUploadClick={onUploadDataClick}
          tableData={tableData}
          key={idx}
          onDownloadClick={downloadTableCSV}
        />
      )
    );

  return (
    <Container fluid className="admin-console p-4">
      <Modal
        modalToShow={modalShowing}
        onHide={hideModal}
        selectedTable={selectedTable}
        handleUpload={handleUpload}
      />
      <Card className="m-4 p-4">
        <h1>Admin Console</h1>
        <h2>New Data</h2>
        <p>
          To add a new data table or edit columns of an existing data table,
          please contact our Development team.
        </p>
        <h2>Existing Data Tables</h2>
        <p className="mb-0">
          To update existing data tables (adding new rows, editing existing
          content, etc.), select an existing table and upload the updated .csv
          file with the same header names and number of headers.
        </p>
        <p>
          Note: This will not interrupt any existing users in their sessions,
          but will take effect for any new sessions.
        </p>
        {getTableCards()}
      </Card>
    </Container>
  );
}
