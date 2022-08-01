import img_f1 from "assets/images/f1.png";
import img_f3 from "assets/images/f3.png";
import img_f4 from "assets/images/f4.png";
import img_d from "assets/images/d.png";
import img_pd from "assets/images/pd.png";
import img_b3 from "assets/images/b3.png";
import img_b4 from "assets/images/b4.png";

import { ActionType } from "components/action/action";
import { f1, f3, f4, b3, b4, d, pd } from "consts/jobactions";

export const f1_action: ActionType = {
  ...f1,
  icon: img_f1,
};

export const f3_action: ActionType = {
  ...f3,
  icon: img_f3,
};

export const f4_action: ActionType = {
  ...f4,
  icon: img_f4,
};

export const d_action: ActionType = {
  ...d,
  icon: img_d,
};

export const b3_action: ActionType = {
  ...b3,
  icon: img_b3,
};

export const b4_action: ActionType = {
  ...b4,
  icon: img_b4,
};

export const pd_action: ActionType = {
  ...pd,
  icon: img_pd,
};
