import { DashboardState } from "app/containers/Dashboard/types";
import { TeamGuideState } from "app/containers/TeamGuide/types";
import { AdminConsoleState } from "app/containers/AdminConsole/types";
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

export interface RootState {
  dashboard?: DashboardState;
  teamGuide?: TeamGuideState;
  adminConsole?: AdminConsoleState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
