import { ElementalStates } from "consts/jobactions";
import {
  N0_STANDARD_ROTATION,
  N111_DOUBLE_TRANSPOSE_F3P,
  N16_1_DOUBLE_PARADOX_AF2,
} from "consts/lines";
import { startCalculation } from "./utils";

// base sps
const baseSps = 380;

// 3.2 sps bis
const highSps = 2287;

describe("potency calculation", () => {
  test("N0_STANDARD_ROTATION, base sps, f3p adjust", () => {
    const { potency, time, f3p } = startCalculation(
      N0_STANDARD_ROTATION,
      true,
      baseSps,
      ElementalStates.AF3
    );

    expect(potency).toBeCloseTo(5821.2, 2);
    expect(time).toBeCloseTo(34.2, 2);
    expect(f3p).toBe(1);
  });

  test("N0_STANDARD_ROTATION, high sps, f3p adjust", () => {
    const { potency, time, f3p } = startCalculation(
      N0_STANDARD_ROTATION,
      true,
      highSps,
      ElementalStates.AF3
    );

    expect(potency).toBeCloseTo(5821.2, 2);
    expect(time).toBeCloseTo(29.9, 2);
    expect(f3p).toBe(1);
  });

  test("N0_STANDARD_ROTATION, base sps, no f3p adjust", () => {
    const { potency, time, f3p } = startCalculation(
      N0_STANDARD_ROTATION,
      false,
      baseSps,
      ElementalStates.AF3
    );

    expect(potency).toBeCloseTo(5634, 2);
    expect(time).toBeCloseTo(33.2, 2);
    expect(f3p).toBe(0);
  });

  test("N0_STANDARD_ROTATION, high sps, no f3p adjust", () => {
    const { potency, time, f3p } = startCalculation(
      N0_STANDARD_ROTATION,
      false,
      highSps,
      ElementalStates.AF3
    );

    expect(potency).toBeCloseTo(5634, 2);
    expect(time).toBeCloseTo(29.03, 2);
    expect(f3p).toBe(0);
  });

  test("N111_DOUBLE_TRANSPOSE_F3P, base sps, f3p adjust", () => {
    const { potency, time, f3p } = startCalculation(
      N111_DOUBLE_TRANSPOSE_F3P,
      true,
      baseSps,
      ElementalStates.AF3
    );

    expect(potency).toBeCloseTo(3150, 2);
    expect(time).toBeCloseTo(16.8, 2);
    expect(f3p).toBe(0);
  });

  test("N111_DOUBLE_TRANSPOSE_F3P, high sps, f3p adjust", () => {
    const { potency, time, f3p } = startCalculation(
      N111_DOUBLE_TRANSPOSE_F3P,
      true,
      highSps,
      ElementalStates.AF3
    );

    expect(potency).toBeCloseTo(3150, 2);
    expect(time).toBeCloseTo(14.68, 2);
    expect(f3p).toBe(0);
  });

  test("N16_1_DOUBLE_PARADOX_AF2, base sps, f3p adjust", () => {
    const { potency, time, f3p } = startCalculation(
      N16_1_DOUBLE_PARADOX_AF2,
      true,
      baseSps,
      ElementalStates.AF3
    );

    expect(potency).toBeCloseTo(5419.52, 2);
    expect(time).toBeCloseTo(32, 2);
    expect(f3p).toBe(2);
  });

  test("N16_1_DOUBLE_PARADOX_AF2, high sps, f3p adjust", () => {
    const { potency, time, f3p } = startCalculation(
      N16_1_DOUBLE_PARADOX_AF2,
      true,
      highSps,
      ElementalStates.AF3
    );

    expect(potency).toBeCloseTo(5419.52, 2);
    expect(time).toBeCloseTo(27.98, 2);
    expect(f3p).toBe(2);
  });

  test("N16_1_DOUBLE_PARADOX_AF2, base sps, no f3p adjust", () => {
    const { potency, time, f3p } = startCalculation(
      N16_1_DOUBLE_PARADOX_AF2,
      false,
      baseSps,
      ElementalStates.AF3
    );

    expect(potency).toBeCloseTo(5120, 2);
    expect(time).toBeCloseTo(30.4, 2);
    expect(f3p).toBe(0);
  });

  test("N16_1_DOUBLE_PARADOX_AF2, high sps, no f3p adjust", () => {
    const { potency, time, f3p } = startCalculation(
      N16_1_DOUBLE_PARADOX_AF2,
      false,
      highSps,
      ElementalStates.AF3
    );

    expect(potency).toBeCloseTo(5120, 2);
    expect(time).toBeCloseTo(26.59, 2);
    expect(f3p).toBe(0);
  });
});
