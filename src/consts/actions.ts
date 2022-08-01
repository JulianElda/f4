import img_f1 from "assets/images/f1.png";
import img_f3 from "assets/images/f3.png";
import img_f4 from "assets/images/f4.png";
import img_d from "assets/images/d.png";
import img_pd from "assets/images/pd.png";
import img_b3 from "assets/images/b3.png";
import img_b4 from "assets/images/b4.png";

import { ActionType } from "components/action/action";
import { F1, F3, F4, B3, B4, D, PD } from "consts/jobactions";

export const f1_action: ActionType = {
  ...F1,
  icon: img_f1,
};

export const f3_action: ActionType = {
  ...F3,
  icon: img_f3,
};

export const f4_action: ActionType = {
  ...F4,
  icon: img_f4,
};

export const d_action: ActionType = {
  ...D,
  icon: img_d,
};

export const b3_action: ActionType = {
  ...B3,
  icon: img_b3,
};

export const b4_action: ActionType = {
  ...B4,
  icon: img_b4,
};

export const pd_action: ActionType = {
  ...PD,
  icon: img_pd,
};
