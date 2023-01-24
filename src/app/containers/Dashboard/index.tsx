/**
 *
 * Dashboard
 *
 */

import React from "react";
import { Col, Row, Container } from "react-bootstrap";
// import { useSelector, useDispatch } from 'react-redux';
//
// import { useInjectReducer, useInjectSaga } from "utils/redux-injectors";
// import { reducer, sliceKey } from "./slice";
// import { selectDashboard } from "./selectors";
// import { dashboardSaga } from "./saga";

interface Props {}

export default function Dashboard(props: Props) {
  // useInjectReducer({ key: sliceKey, reducer: reducer });
  // useInjectSaga({ key: sliceKey, saga: dashboardSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const dashboard = useSelector(selectDashboard);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const dispatch = useDispatch();

  return (
    <Container>
      <Col>
        <Row>Dashboard</Row>
      </Col>
    </Container>
  );
}
