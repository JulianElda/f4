import { useEffect, useState } from "react";

import {
  CASTER_TAX,
  ElementalStates,
  MULTIPLIER_CAST,
  MULTIPLIER_POTENCY,
} from "consts/jobactions";
import { B3, F3, PD, JobActionType } from "consts/jobactions";
import { ActionType } from "components/action/action";
import Details, { DetailedAction } from "components/details/details";

type CalculatorProps = {
  actions: ActionType[];
};

// add SpS calculator later
const GCD_RECAST: number = 2500;

export default function Calculator(props: CalculatorProps) {
  const [potency, setPotency] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [detailedActions, setDetailedActions] = useState<DetailedAction[]>([]);

  const startCalculation = function (jobActions: JobActionType[]) {
    let currentElement: ElementalStates = ElementalStates.AF3;
    let totalPotency: number = 0;
    let totalTime: number = 0;
    let totalDetailedActions: DetailedAction[] = [];

    for (let i = 0; i < jobActions.length; i++) {
      let action: JobActionType = jobActions[i];
      let detailedAction: DetailedAction;
      let potencyMultiplier: number =
        MULTIPLIER_POTENCY[action.element][currentElement];
      let castMultiplier: number =
        MULTIPLIER_CAST[action.element][currentElement];

      let castTime: number = action.cast * castMultiplier;
      let gcdPotency: number = action.potency * potencyMultiplier;

      if (
        action.id === PD.id &&
        //currentElement === ElementalStates.UI1 ||
        //currentElement === ElementalStates.UI2 ||
        currentElement === ElementalStates.UI3
      ) {
        castTime = 0;
      }

      // dont count filler spells
      if (action.filler) {
        totalPotency += 0;
        totalTime += 0;
        detailedAction = {
          name: action.name,
        };
      }
      // f4, despair
      else if (castTime > GCD_RECAST) {
        totalPotency += gcdPotency;
        totalTime += castTime + CASTER_TAX;

        detailedAction = {
          name: action.name,
          currentElement: currentElement,
          potency: action.potency,
          adjustedPotency: gcdPotency,
          potencyMultiplier: potencyMultiplier,
          cast: action.cast,
          adjustedCast: castTime + CASTER_TAX,
          castMultiplier: castMultiplier,
        };
      }
      // fire pd, b4
      else if (castTime === GCD_RECAST) {
        totalPotency += gcdPotency;
        totalTime += GCD_RECAST + CASTER_TAX;

        detailedAction = {
          name: action.name,
          currentElement: currentElement,
          potency: action.potency,
          adjustedPotency: gcdPotency,
          potencyMultiplier: potencyMultiplier,
          cast: action.cast,
          adjustedCast: GCD_RECAST + CASTER_TAX,
          castMultiplier: castMultiplier,
        };
      }
      // f3, b3, ice pd
      else {
        totalPotency += gcdPotency;
        totalTime += GCD_RECAST;

        detailedAction = {
          name: action.name,
          currentElement: currentElement,
          potency: action.potency,
          adjustedPotency: gcdPotency,
          potencyMultiplier: potencyMultiplier,
          cast: action.cast,
          adjustedCast: GCD_RECAST,
          castMultiplier: castMultiplier,
        };
      }

      switch (action.id) {
        case F3.id:
          currentElement = ElementalStates.AF3;
          break;
        case B3.id:
          currentElement = ElementalStates.UI3;
          break;
      }

      totalDetailedActions.push(detailedAction);

      setPotency(totalPotency);
      setTotalTime(totalTime / 1000);
      setDetailedActions(totalDetailedActions);
    }
  };

  useEffect(
    function () {
      startCalculation(props.actions);
    },
    [props.actions]
  );

  return (
    <>
      {props.actions.length >= 1 && (
        <>
          <div className="bg-white shadow rounded my-4 p-2">
            <p className="font-mono">{potency} potency</p>
            <p className="font-mono">{totalTime} s</p>
            <p className="font-mono">{(potency / totalTime).toFixed(2)} pps</p>
          </div>
          <Details detailedActions={detailedActions} />
        </>
      )}
    </>
  );
}
