import { DetailedAction } from "components/details/details";
import {
  ActionElements,
  B1,
  B3,
  CASTER_TAX,
  ElementalStates,
  F1,
  F3,
  F3P,
  JobActionType,
  MULTIPLIER_CAST,
  MULTIPLIER_POTENCY,
  PD,
  SWIFTCAST,
  TPOSE,
  TRIPLECAST,
} from "consts/jobactions";

export const calculateF3Potency = function (howMany: number) {
  // 40% chance of producing F3P
  const f3pProc = 0.4;

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

export const calculateRecast = function (input: number, base = 2500): number {
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

type CalculationResult = {
  potency: number;
  time: number;
  detailedActions: DetailedAction[];
  f3p: number;
};

export const startCalculation = function (
  jobActions: JobActionType[],
  f3pAdjust: boolean,
  sps: number,
  currentElement: ElementalStates
): CalculationResult {
  //const currentElement: ElementalStates = ElementalStates.AF3;
  let totalPotency = 0;
  let totalTime = 0;
  const totalDetailedActions: DetailedAction[] = [];
  let totalF3PProducers = 0;

  let swiftcastCounter = 0;
  let triplecastCounter = 0;

  for (let i = 0; i < jobActions.length; i++) {
    const action: JobActionType = jobActions[i];
    const potencyMultiplier: number =
      MULTIPLIER_POTENCY[action.element][currentElement];
    const castMultiplier: number =
      MULTIPLIER_CAST[action.element][currentElement];

    // cast speed based on sps
    const spsAdjustedCast = calculateRecast(sps, action.cast) * 1000;
    // gcd based on sps
    const spsAdjustedRecast = calculateRecast(sps, 2500) * 1000;

    // multiply based on AF or UI
    let elementAdjustedCastTime: number = spsAdjustedCast * castMultiplier;
    const elementAdjustedPotency: number = action.potency * potencyMultiplier;

    let tmpPotency = 0;
    let tmpTime = 0;

    // handle some exceptions
    // PD on UI is instant cast
    if (action.id === PD.id && isUIElement(currentElement)) {
      elementAdjustedCastTime = 0;
    }
    // F3P is instant cast
    else if (action.id === F3P.id) {
      elementAdjustedCastTime = 0;
    }

    // handle instant casts
    if (action.cast > 0) {
      // swiftcast is used before triplecast
      if (swiftcastCounter > 0) {
        swiftcastCounter = 0;
        elementAdjustedCastTime = 0;
      } else if (triplecastCounter > 0) {
        triplecastCounter--;
        elementAdjustedCastTime = 0;
      }
    }

    // add instant cast counters
    if (action.id === SWIFTCAST.id) {
      swiftcastCounter = 1;
    } else if (action.id === TRIPLECAST.id) {
      triplecastCounter = 3;
    }

    // check F3P producers
    if (
      f3pAdjust &&
      // AF PD
      ((action.id === PD.id && isAFElement(currentElement)) ||
        // F1
        (action.id === F1.id && isAFElement(currentElement)))
    ) {
      totalF3PProducers++;
    }

    // dont count filler spells
    if (action.filler) {
      tmpPotency = 0;
      tmpTime = 0;
    }
    // "slow spells", F4, despair
    // add caster tax
    else if (elementAdjustedCastTime > spsAdjustedCast) {
      tmpPotency = elementAdjustedPotency;
      tmpTime = elementAdjustedCastTime + CASTER_TAX;
    }
    // "fast spells", UI F3, AF B3, UI PD,  and instant casted spells
    // even when you cast them faster, these recast is always your gcd
    else if (elementAdjustedCastTime < spsAdjustedCast) {
      tmpPotency = elementAdjustedPotency;
      // base gcd
      tmpTime = calculateRecast(sps, 2500) * 1000;
    }
    // "normal hardcasted spells", AF PD, B4
    // add caster tax
    else if (elementAdjustedCastTime === spsAdjustedCast) {
      tmpPotency = elementAdjustedPotency;
      tmpTime = spsAdjustedCast + CASTER_TAX;
    }

    totalPotency += tmpPotency;
    totalTime += tmpTime;

    const detailedAction: DetailedAction = {
      name: action.name,
      filler: action.filler,
      currentElement: currentElement,
      potency: action.potency,
      adjustedPotency: tmpPotency,
      potencyMultiplier: potencyMultiplier,
      cast: elementAdjustedCastTime,
      adjustedCast: tmpTime,
      castMultiplier: castMultiplier,
      recast: spsAdjustedRecast,
      note: "",
    };

    // each action changes elemental states differently
    currentElement = changeCurrentElementFromAction(currentElement, action);

    totalDetailedActions.push(detailedAction);
  }

  // "estimated" damage from probability of getting a proc * af1 f3p potency
  totalPotency +=
    calculateF3Potency(totalF3PProducers) *
    F3.potency *
    MULTIPLIER_POTENCY[ActionElements.FIRE][ElementalStates.AF3];

  totalTime +=
    calculateF3Potency(totalF3PProducers) * calculateRecast(sps, 2500) * 1000;

  return {
    potency: totalPotency,
    time: totalTime / 1000,
    detailedActions: totalDetailedActions,
    f3p: totalF3PProducers,
  };
};
