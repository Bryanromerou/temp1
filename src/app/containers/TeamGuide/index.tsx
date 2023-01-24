/**
 *
 * TeamGuide
 *
 */

import React from "react";
// import { useSelector, useDispatch } from 'react-redux';

// import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
// import { reducer, sliceKey } from './slice';
// import { selectTeamGuide } from './selectors';
// import { teamGuideSaga } from './saga';

interface Props {}

export default function TeamGuide(props: Props) {
  // useInjectReducer({ key: sliceKey, reducer: reducer });
  //   useInjectSaga({ key: sliceKey, saga: teamGuideSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const teamGuide = useSelector(selectTeamGuide);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const dispatch = useDispatch();

  return (
    <>
      <div>Team Guide</div>
    </>
  );
}
