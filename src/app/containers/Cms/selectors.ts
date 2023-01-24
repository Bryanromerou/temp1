// import { createSelector } from '@reduxjs/toolkit';

import { RootState } from "types";
import { initialState } from "./slice";

const selectDomain = (state: RootState) => state.cms || initialState;

// export const selectCms = createSelector(
//   [selectDomain],
//   cmsState => cmsState,
// );
