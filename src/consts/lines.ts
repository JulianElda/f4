import {
  f1_action,
  f3_action,
  f4_action,
  d_action,
  b3_action,
  b4_action,
  pd_action,
  tpose_action,
  swiftcast_action,
  f3p_action,
  filler_action,
} from "consts/actions";
import { ActionType } from "components/action/action";

// B3 B4 PD F3 3xF4 PD 3xF4 Desp (F3P)
export const N0_STANDARD_ROTATION: ActionType[] = [
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

// B3 B4 F3 3xF4 PD 3xF4 Desp (F3P)
export const N3_STANDARD_UI_PD_SKIP: ActionType[] = [
  b3_action,
  b4_action,
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

// B3 B4 PD F3 3xF4 PD 2xF4 Desp (F3P)
export const N4_STANDARD_5F4: ActionType[] = [
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
  d_action,
];

// B3 F3 4xF4 PD Desp (F3P)
export const N10_4F4: ActionType[] = [
  b3_action,
  f3_action,
  f4_action,
  f4_action,
  pd_action,
  f4_action,
  f4_action,
  d_action,
];

// B3 PD F3 5xF4 Desp
export const N13_5F4: ActionType[] = [
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
export const N15_DOUBLE_PARADOX: ActionType[] = [
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

// B3 B4 PD AF1 PD F4 F1 4xF4 Desp (F3P)
export const N16_1_DOUBLE_PARADOX_AF2: ActionType[] = [
  b3_action,
  b4_action,
  pd_action,
  tpose_action,
  pd_action,
  f4_action,
  f1_action,
  f4_action,
  f4_action,
  f4_action,
  f4_action,
  d_action,
];

// UI1 PD AF1 F3P 3xF4 Desp
export const N111_DOUBLE_TRANSPOSE_F3P: ActionType[] = [
  tpose_action,
  pd_action,
  filler_action,
  filler_action,
  tpose_action,
  f3p_action,
  f4_action,
  f4_action,
  f4_action,
  d_action,
];

// UI1 PD F3* 3xF4 Desp
export const I5_3xF4_TRANSPOSE: ActionType[] = [
  pd_action,
  swiftcast_action,
  filler_action,
  f3_action,
  f4_action,
  f4_action,
  f4_action,
  d_action,
];
