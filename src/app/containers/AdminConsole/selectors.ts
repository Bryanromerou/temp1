// import { createSelector } from '@reduxjs/toolkit';

import { RootState } from "types";
import { initialState } from "./slice";

const selectDomain = (state: RootState) => state.adminConsole || initialState;

// export const selectAdminConsole = createSelector(
//   [selectDomain],
//   adminConsoleState => adminConsoleState,
// );
