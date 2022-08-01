import { useEffect, useState } from "react";

import { B3, F3, PD, JobActionType } from "consts/jobactions";
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

// add SpS calculator later
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

      // dont count filler spells
      if (action.filler) {
        totalPotency += 0;
      } else {
        totalPotency += gcdPotency;
      }

      switch (action.id) {
        // F3 always changes to AF3
        case F3.id:
          currentElement = ElementalStates.AF3;
          break;
        // B3 always changes to UI3
        case B3.id:
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

      // dont count filler spells
      if (action.filler) {
        totalTime += 0;
      }
      // f4, despair
      else if (castTime > GCD_RECAST) {
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
        case F3.id:
          currentElement = ElementalStates.AF3;
          break;
        case B3.id:
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
      {props.actions.length >= 1 && (
        <div className="bg-white shadow rounded my-4 p-2">
          <p className="font-mono">{potency} potency</p>
          <p className="font-mono">{totalTime} s</p>
          <p className="font-mono">{(potency / totalTime).toFixed(2)} pps</p>
        </div>
      )}
    </>
  );
}
