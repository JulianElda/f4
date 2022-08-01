import { useEffect, useState } from "react";

import { PD, JobActionType } from "consts/jobactions";
import { ActionType } from "components/action/action";
import {
  CASTER_TAX,
  ElementalStates,
  MULTIPLIER_CAST,
  MULTIPLIER_POTENCY,
} from "consts/jobactions";

type CalculatorProps = {
  actions: ActionType[];
};

const GCD_RECAST: number = 2500;

export default function Calculator(props: CalculatorProps) {
  const [potency, setPotency] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);

  const calculateTotalPotency = function (jobActions: JobActionType[]): number {
    let currentElement = ElementalStates.AF3;
    let totalPotency: number = 0;

    for (let i = 0; i < jobActions.length; i++) {
      let action: JobActionType = jobActions[i];

      let gcdPotency =
        action.potency * MULTIPLIER_POTENCY[action.element][currentElement];

      totalPotency += gcdPotency;

      switch (action.id) {
        case "f3":
          currentElement = ElementalStates.AF3;
          break;
        case "b3":
          currentElement = ElementalStates.UI3;
          break;
      }
    }
    return totalPotency;
  };

  const calculateTotalTime = function (jobActions: JobActionType[]): number {
    let currentElement: ElementalStates = ElementalStates.AF3;
    let totalTime: number = 0;

    for (let i = 0; i < jobActions.length; i++) {
      let action: JobActionType = jobActions[i];

      let castTime: number =
        action.cast * MULTIPLIER_CAST[action.element][currentElement];

      if (
        action.id === PD.id /*currentElement === ElementalStates.UI1 ||
          currentElement === ElementalStates.UI2 ||*/ &&
        currentElement === ElementalStates.UI3
      ) {
        castTime = 0;
      }

      // f4, despair
      if (castTime > GCD_RECAST) {
        totalTime += castTime + CASTER_TAX;
      }
      // fire pd, b4
      else if (castTime === GCD_RECAST) {
        totalTime += GCD_RECAST + CASTER_TAX;
      }
      // f3, b3, ice pd
      else {
        totalTime += GCD_RECAST;
      }

      switch (action.id) {
        case "f3":
          currentElement = ElementalStates.AF3;
          break;
        case "b3":
          currentElement = ElementalStates.UI3;
          break;
      }
    }
    return totalTime / 1000;
  };

  useEffect(
    function () {
      setPotency(calculateTotalPotency(props.actions));
      setTotalTime(calculateTotalTime(props.actions));
    },
    [props.actions]
  );

  return (
    <>
      <div className="bg-white shadow rounded my-4 p-2">
        <p>{potency} potency</p>
        <p>{totalTime} s</p>
        <p>{(potency / totalTime).toFixed(2)} pps</p>
      </div>
    </>
  );
}
