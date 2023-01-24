/**
 *
 * Cms
 *
 */

import React from "react";
// import { useSelector, useDispatch } from 'react-redux';

// import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
// import { reducer, sliceKey } from './slice';
// import { selectCms } from './selectors';
// import { cmsSaga } from './saga';

interface Props {}

export default function Cms(props: Props) {
  // useInjectReducer({ key: sliceKey, reducer: reducer });
  // useInjectSaga({ key: sliceKey, saga: cmsSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const cms = useSelector(selectCms);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const dispatch = useDispatch();

  return (
    <>
      <div>CMS Page</div>
    </>
  );
}
