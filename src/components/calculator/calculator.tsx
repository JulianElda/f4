import React, { useEffect, useState } from "react";
import { calculateRecast } from "consts/utils";
import { L1_STANDARD_ROTATION } from "consts/lines";

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
  sps: number;
};

type CalculationResult = {
  potency: number;
  time: number;
  detailedActions: DetailedAction[];
};

export default function Calculator(props: CalculatorProps) {
  const [potency, setPotency] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [detailedActions, setDetailedActions] = useState<DetailedAction[]>([]);

  const [standardPotency, setStandardPotency] = useState<number>(0);
  const [standardTotalTime, setStandardTotalTime] = useState<number>(0);

  const [showDetails, setShowDetails] = useState<boolean>(false);

  const startCalculation = function (
    jobActions: JobActionType[],
    sps: number
  ): CalculationResult {
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
      if (
        action.id === PD.id &&
        //currentElement === ElementalStates.UI1 ||
        //currentElement === ElementalStates.UI2 ||
        currentElement === ElementalStates.UI3
      ) {
        elementAdjustedCastTime = 0;
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

      switch (action.id) {
        case F3.id:
          currentElement = ElementalStates.AF3;
          break;
        case B3.id:
          currentElement = ElementalStates.UI3;
          break;
      }

      totalDetailedActions.push(detailedAction);
    }
    return {
      potency: totalPotency,
      time: totalTime / 1000,
      detailedActions: totalDetailedActions,
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
      let { potency, time } = startCalculation(L1_STANDARD_ROTATION, props.sps);
      setStandardPotency(potency);
      setStandardTotalTime(time);
    },
    [props.sps]
  );

  // calculate from specified actions
  useEffect(
    function () {
      let { potency, time, detailedActions } = startCalculation(
        props.actions,
        props.sps
      );
      setPotency(potency);
      setTotalTime(time);
      setDetailedActions(detailedActions);
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
