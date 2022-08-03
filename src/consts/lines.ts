import {
  f1_action,
  f3_action,
  f4_action,
  d_action,
  b3_action,
  b4_action,
  pd_action,
  tpose_action,
} from "consts/actions";
import { ActionType } from "components/action/action";

// B3 B4 PD F3 3xF4 PD 3xF4 Desp (F3P)
export const L0_STANDARD_ROTATION: ActionType[] = [
  b3_action,
  b4_action,
  pd_action,
  f3_action,
  f4_action,
  f4_action,
  f4_action,
  pd_action,
  f4_action,
  f4_action,
  f4_action,
  d_action,
];

// B3 PD F3 5xF4 Desp
export const L13_5F4: ActionType[] = [
  b3_action,
  pd_action,
  f3_action,
  f4_action,
  f4_action,
  f4_action,
  f4_action,
  f4_action,
  d_action,
];

// B3 B4 PD AF1 PD F1 4xF4 Desp (F3P)
export const L15_DOUBLE_PARADOX: ActionType[] = [
  b3_action,
  b4_action,
  pd_action,
  tpose_action,
  pd_action,
  f1_action,
  f4_action,
  f4_action,
  f4_action,
  f4_action,
  d_action,
];
