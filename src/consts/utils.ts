import {
  F1,
  F3,
  F3P,
  B1,
  B3,
  PD,
  TPOSE,
  ElementalStates,
  JobActionType,
} from "consts/jobactions";

export const calculateF3Potency = function (howMany: number) {
  // 40% chance of producing F3P
  const f3pProc: number = 0.4;

  // probability that multiple F1s or PDs produce at least 1 F3P
  const procChance: number =
    // 100%
    1 -
    Math.pow(
      // probability of NOT getting a proc in one cast
      1 - f3pProc,
      // squared by how many casts
      howMany
    );

  return procChance;
};

export const calculateRecast = function (
  input: number,
  base: number = 2500
): number {
  if (input < 400) input = 400;
  return (
    (100 * ((base * (1000 - (130 * (input - 400)) / 1900)) / 1000 / 1000)) / 100
  );
};

export const isAFElement = function (elementalState: ElementalStates): boolean {
  return (
    elementalState === ElementalStates.AF1 ||
    elementalState === ElementalStates.AF2 ||
    elementalState === ElementalStates.AF3
  );
};

export const isUIElement = function (elementalState: ElementalStates): boolean {
  return (
    elementalState === ElementalStates.UI1 ||
    elementalState === ElementalStates.UI2 ||
    elementalState === ElementalStates.UI3
  );
};

export const changeCurrentElementFromAction = function (
  currentElement: ElementalStates,
  action: JobActionType
): ElementalStates {
  let resultElement: ElementalStates = currentElement;
  switch (action.id) {
    // F1
    case F1.id: {
      switch (currentElement) {
        // change to AF1
        case ElementalStates.UI1:
        case ElementalStates.UI2:
        case ElementalStates.UI3:
          //case ElementalStates.NONE:
          resultElement = ElementalStates.AF1;
          break;
        // "upgrade" AF
        case ElementalStates.AF1:
          resultElement = ElementalStates.AF2;
          break;
        case ElementalStates.AF2:
          resultElement = ElementalStates.AF3;
          break;
        case ElementalStates.AF3:
          resultElement = ElementalStates.AF3;
          break;
      }
      break;
    }
    // F3 always changes to AF3
    case F3.id:
    case F3P.id:
      resultElement = ElementalStates.AF3;
      break;
    // B1
    case B1.id: {
      switch (currentElement) {
        // change to UI1
        case ElementalStates.AF1:
        case ElementalStates.AF2:
        case ElementalStates.AF3:
          //case ElementalStates.NONE:
          resultElement = ElementalStates.UI1;
          break;
        // "upgrade" UI
        case ElementalStates.UI1:
          resultElement = ElementalStates.UI2;
          break;
        case ElementalStates.UI2:
          resultElement = ElementalStates.UI3;
          break;
        case ElementalStates.UI3:
          resultElement = ElementalStates.UI3;
          break;
      }
      break;
    }
    // F3 always changes to UI3
    case B3.id:
      resultElement = ElementalStates.UI3;
      break;
    // paradox
    case PD.id: {
      switch (currentElement) {
        // "upgrade" AF
        case ElementalStates.AF1:
          resultElement = ElementalStates.AF2;
          break;
        case ElementalStates.AF2:
          resultElement = ElementalStates.AF3;
          break;
        case ElementalStates.AF3:
          resultElement = ElementalStates.AF3;
          break;
        // "upgrade" UI
        case ElementalStates.UI1:
          resultElement = ElementalStates.UI2;
          break;
        case ElementalStates.UI2:
          resultElement = ElementalStates.UI3;
          break;
        case ElementalStates.UI3:
          resultElement = ElementalStates.UI3;
          break;
      }
      break;
    }

    // Transpose
    case TPOSE.id:
      // AF* to UI1
      if (isAFElement(currentElement)) resultElement = ElementalStates.UI1;
      // UI* to AF1
      else if (isUIElement(currentElement)) resultElement = ElementalStates.AF1;
      break;

    default:
      resultElement = currentElement;
  }
  return resultElement;
};
