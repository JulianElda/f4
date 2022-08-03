import React, { useEffect, useState } from "react";
import { calculateRecast } from "consts/utils";
import { L0_STANDARD_ROTATION } from "consts/lines";

import {
  F1,
  F3,
  B1,
  B3,
  PD,
  TPOSE,
  CASTER_TAX,
  ElementalStates,
  ActionElements,
  JobActionType,
  MULTIPLIER_CAST,
  MULTIPLIER_POTENCY,
} from "consts/jobactions";
import { ActionType } from "components/action/action";
import Details, { DetailedAction } from "components/details/details";
import F3PDetail from "components/details/f3pdetail";

type CalculatorProps = {
  actions: ActionType[];
  sps: number;
};

type CalculationResult = {
  potency: number;
  time: number;
  detailedActions: DetailedAction[];
  f3p: number;
};

export default function Calculator(props: CalculatorProps) {
  const [potency, setPotency] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [detailedActions, setDetailedActions] = useState<DetailedAction[]>([]);

  const [standardPotency, setStandardPotency] = useState<number>(0);
  const [standardTotalTime, setStandardTotalTime] = useState<number>(0);

  const [showDetails, setShowDetails] = useState<boolean>(false);

  const [f3PProducers, setF3PProducers] = useState<number>(0);

  const startCalculation = function (
    jobActions: JobActionType[],
    sps: number
  ): CalculationResult {
    let currentElement: ElementalStates = ElementalStates.AF3;
    let totalPotency: number = 0;
    let totalTime: number = 0;
    let totalDetailedActions: DetailedAction[] = [];
    let totalF3PProducers: number = 0;

    const calculateF3Potency = function (howMany: number) {
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

    const isAFElement = function (elementalState: ElementalStates): boolean {
      return (
        elementalState === ElementalStates.AF1 ||
        elementalState === ElementalStates.AF2 ||
        elementalState === ElementalStates.AF3
      );
    };

    const isUIElement = function (elementalState: ElementalStates): boolean {
      return (
        elementalState === ElementalStates.UI1 ||
        elementalState === ElementalStates.UI2 ||
        elementalState === ElementalStates.UI3
      );
    };

    for (let i = 0; i < jobActions.length; i++) {
      let action: JobActionType = jobActions[i];
      let detailedAction: DetailedAction;
      let potencyMultiplier: number =
        MULTIPLIER_POTENCY[action.element][currentElement];
      let castMultiplier: number =
        MULTIPLIER_CAST[action.element][currentElement];

      // cast speed based on sps
      let spsAdjustedCast = calculateRecast(sps, action.cast) * 1000;
      // gcd based on sps
      let spsAdjustedRecast = calculateRecast(sps, 2500) * 1000;

      // multiply based on AF or UI
      let elementAdjustedCastTime: number = spsAdjustedCast * castMultiplier;
      let elementAdjustedPotency: number = action.potency * potencyMultiplier;

      let tmpPotency: number = 0;
      let tmpTime: number = 0;

      // handle some exceptions
      // PD on UI is instant cast
      if (action.id === PD.id && isUIElement(currentElement)) {
        elementAdjustedCastTime = 0;
      }

      // check F3P producers
      if (
        // AF PD
        (action.id === PD.id && isAFElement(currentElement)) ||
        // F1
        (action.id === F1.id && isAFElement(currentElement))
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

      detailedAction = {
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
      switch (action.id) {
        // F1
        case F1.id: {
          switch (currentElement) {
            // change to AF1
            case ElementalStates.UI1:
            case ElementalStates.UI2:
            case ElementalStates.UI3:
              //case ElementalStates.NONE:
              currentElement = ElementalStates.AF1;
              break;
            // "upgrade" AF
            case ElementalStates.AF1:
              currentElement = ElementalStates.AF2;
              break;
            case ElementalStates.AF2:
              currentElement = ElementalStates.AF3;
              break;
            case ElementalStates.AF3:
              currentElement = ElementalStates.AF3;
              break;
          }
          break;
        }
        // F3 always changes to AF3
        case F3.id:
          currentElement = ElementalStates.AF3;
          break;
        // B1
        case B1.id: {
          switch (currentElement) {
            // change to UI1
            case ElementalStates.AF1:
            case ElementalStates.AF2:
            case ElementalStates.AF3:
              //case ElementalStates.NONE:
              currentElement = ElementalStates.UI1;
              break;
            // "upgrade" UI
            case ElementalStates.UI1:
              currentElement = ElementalStates.UI2;
              break;
            case ElementalStates.UI2:
              currentElement = ElementalStates.UI3;
              break;
            case ElementalStates.UI3:
              currentElement = ElementalStates.UI3;
              break;
          }
          break;
        }
        // F3 always changes to UI3
        case B3.id:
          currentElement = ElementalStates.UI3;
          break;
        // paradox
        case PD.id: {
          switch (currentElement) {
            // "upgrade" AF
            case ElementalStates.AF1:
              currentElement = ElementalStates.AF2;
              break;
            case ElementalStates.AF2:
              currentElement = ElementalStates.AF3;
              break;
            case ElementalStates.AF3:
              currentElement = ElementalStates.AF3;
              break;
            // "upgrade" UI
            case ElementalStates.UI1:
              currentElement = ElementalStates.UI2;
              break;
            case ElementalStates.UI2:
              currentElement = ElementalStates.UI3;
              break;
            case ElementalStates.UI3:
              currentElement = ElementalStates.UI3;
              break;
          }
          break;
        }

        // Transpose
        case TPOSE.id:
          // AF* to UI1
          if (isAFElement(currentElement)) currentElement = ElementalStates.UI1;
          // UI* to AF1
          else if (isUIElement(currentElement))
            currentElement = ElementalStates.AF1;
          break;
      }

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

  const compareStandard = function (): string {
    let standardPps = standardPotency / standardTotalTime;
    let pps = potency / totalTime;

    return ((pps / standardPps) * 100).toFixed(3);
  };

  // calculate standard rotation from sps
  useEffect(
    function () {
      let { potency, time, f3p } = startCalculation(
        L0_STANDARD_ROTATION,
        props.sps
      );
      setStandardPotency(potency);
      setStandardTotalTime(time);
      setF3PProducers(f3p);
    },
    [props.sps]
  );

  // calculate from specified actions
  useEffect(
    function () {
      let { potency, time, detailedActions, f3p } = startCalculation(
        props.actions,
        props.sps
      );
      setPotency(potency);
      setTotalTime(time);
      setDetailedActions(detailedActions);
      setF3PProducers(f3p);
    },
    [props.actions, props.sps]
  );

  const getDetails = function (): React.ReactNode {
    if (showDetails)
      return (
        <>
          <label
            onClick={() => setShowDetails(false)}
            className="text-sm underline decoration-dotted hover:decoration-solid cursor-pointer px-2">
            Hide
          </label>
          <Details detailedActions={detailedActions} />
          {f3PProducers > 0 && <F3PDetail f3PProducers={f3PProducers} />}
        </>
      );
    else
      return (
        <label
          onClick={() => setShowDetails(true)}
          className="text-sm underline decoration-dotted hover:decoration-solid cursor-pointer px-2">
          Show details
        </label>
      );
  };

  return (
    <>
      {props.actions.length >= 1 && (
        <>
          <div className="bg-white shadow rounded mt-4 p-2">
            <p className="font-mono">{potency} potency</p>
            <p className="font-mono">{totalTime.toFixed(2)} s</p>
            <p className="font-mono">{(potency / totalTime).toFixed(2)} pps</p>
            <p className="font-mono">{compareStandard()}% from standard</p>
            {getDetails()}
          </div>
        </>
      )}
    </>
  );
}
