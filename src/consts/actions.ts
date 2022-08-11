import img_f1 from "assets/images/f1.png";
import img_f3 from "assets/images/f3.png";
import img_f3p from "assets/images/f3p.png";
import img_f4 from "assets/images/f4.png";
import img_d from "assets/images/d.png";
import img_pd from "assets/images/pd.png";
import img_b1 from "assets/images/b1.png";
import img_b3 from "assets/images/b3.png";
import img_b4 from "assets/images/b4.png";
import img_t3 from "assets/images/t3.png";
import img_xeno from "assets/images/xeno.png";
import img_tpose from "assets/images/transpose.png";
import img_swift from "assets/images/swift.png";
import img_triple from "assets/images/triplecast.png";
import img_mf from "assets/images/mf.png";
import img_lucid from "assets/images/lucid.png";
import img_filler from "assets/images/filler.png";

import { ActionType } from "components/action/action";
import {
  F1,
  F3,
  F3P,
  F4,
  B3,
  B4,
  D,
  PD,
  XENO,
  T3P,
  TPOSE,
  SWIFTCAST,
  TRIPLECAST,
  MANAFONT,
  LUCID,
  FILLER,
} from "consts/jobactions";

export const f1_action: ActionType = {
  ...F1,
  icon: img_f1,
};

export const f3_action: ActionType = {
  ...F3,
  icon: img_f3,
};

export const f3p_action: ActionType = {
  ...F3P,
  icon: img_f3p,
};

export const f4_action: ActionType = {
  ...F4,
  icon: img_f4,
};

export const d_action: ActionType = {
  ...D,
  icon: img_d,
};

export const b1_action: ActionType = {
  ...B3,
  icon: img_b1,
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

export const t3p_action: ActionType = {
  ...T3P,
  icon: img_t3,
};

export const xeno_action: ActionType = {
  ...XENO,
  icon: img_xeno,
};

export const tpose_action: ActionType = {
  ...TPOSE,
  icon: img_tpose,
};

export const swiftcast_action: ActionType = {
  ...SWIFTCAST,
  icon: img_swift,
};

export const triplecast_action: ActionType = {
  ...TRIPLECAST,
  icon: img_triple,
};

export const manafont_action: ActionType = {
  ...MANAFONT,
  icon: img_mf,
};

export const lucid_action: ActionType = {
  ...LUCID,
  icon: img_lucid,
};

export const filler_action: ActionType = {
  ...FILLER,
  icon: img_filler,
};
