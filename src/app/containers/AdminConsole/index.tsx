/**
 *
 * AdminConsole
 *
 */

import React from "react";
import { Row, Container, Card } from "react-bootstrap";
import { getAvailableTables } from "utils/fakeDB";
// import { useSelector, useDispatch } from 'react-redux';

// import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
// import { reducer, sliceKey } from './slice';
// import { selectAdminConsole } from './selectors';
// import { adminConsoleSaga } from "./saga";
import TableCard from "./TableCard";

interface Props {}

export default function AdminConsole(props: Props) {
  // useInjectReducer({ key: sliceKey, reducer: reducer });
  //   useInjectSaga({ key: sliceKey, saga: adminConsoleSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const adminConsole = useSelector(selectAdminConsole);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const dispatch = useDispatch();

  const table = getAvailableTables();

  const getTableCards = () =>
    Object.values(table).map(
      ({ tagName, tableName, tableDescription, tableColumns }, idx) => (
        <TableCard
          tagName={tagName}
          tableName={tableName}
          tableDescription={tableDescription}
          tableColumns={tableColumns}
          onUploadDataClick={() => {
            console.log("you have clicked");
          }}
          key={idx}
        />
      )
    );

  return (
    <Container fluid>
      <Card>
        <h1>Admin Console</h1>
        <h2>New Data</h2>
        <p>
          To add a new data table or edit columns of an existing data table,
          please contact our Development team.
        </p>
        <h2>Existing Data Tables</h2>
        <p>
          To update existing data tables (adding new rows, editing existing
          content, etc.), select an existing table and upload the updated .csv
          file with the same header names and number of headers. Note: This will
          not interrupt any existing users in their sessions, but will take
          effect for any new sessions.
        </p>
        {getTableCards()}
      </Card>
    </Container>
  );
}
