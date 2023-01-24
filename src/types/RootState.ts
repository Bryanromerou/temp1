import { DashboardState } from 'app/containers/Dashboard/types';
import { CmsState } from 'app/containers/Cms/types';
import { TeamGuideState } from 'app/containers/TeamGuide/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

export interface RootState {
  dashboard?: DashboardState;
  cms?: CmsState;
  teamGuide?: TeamGuideState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
