// import { createSelector } from '@reduxjs/toolkit';

import { RootState } from "types";
import { initialState } from "./slice";

const selectDomain = (state: RootState) => state.teamGuide || initialState;

// export const selectTeamGuide = createSelector(
//   [selectDomain],
//   teamGuideState => teamGuideState,
// );
