import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "store/hooks";
import { getF3p, getSps } from "store/config";
import { getStartingElement } from "store/config";

import {
  calculateF3Potency,
  calculateRecast,
  changeCurrentElementFromAction,
  isAFElement,
  isUIElement,
} from "consts/utils";
import { N0_STANDARD_ROTATION } from "consts/lines";
import {
  F1,
  F3,
  PD,
  SWIFTCAST,
  TRIPLECAST,
  CASTER_TAX,
  ElementalStates,
  ActionElements,
  JobActionType,
  MULTIPLIER_CAST,
  MULTIPLIER_POTENCY,
  F3P,
} from "consts/jobactions";
import Details, { DetailedAction } from "components/details/details";
import F3PDetail from "components/details/f3pdetail";
import { getActions } from "store/actions";

type CalculationResult = {
  potency: number;
  time: number;
  detailedActions: DetailedAction[];
  f3p: number;
};

export default function Calculator() {
  const actions = useAppSelector(getActions);
  const f3pAdjust = useAppSelector(getF3p);
  const sps = useAppSelector(getSps);
  const startingElement = useAppSelector(getStartingElement);

  const [potency, setPotency] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [detailedActions, setDetailedActions] = useState<DetailedAction[]>([]);

  const [standardPotency, setStandardPotency] = useState<number>(0);
  const [standardTotalTime, setStandardTotalTime] = useState<number>(0);

  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [f3PProducers, setF3PProducers] = useState<number>(0);

  const startCalculation = useCallback(function (
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
  },
  []);

  const compareStandard = function (): string {
    const standardPps = standardPotency / standardTotalTime;
    const pps = potency / totalTime;

    return ((pps / standardPps) * 100).toFixed(2);
  };

  // calculate standard pps
  useEffect(
    function () {
      const { potency, time } = startCalculation(
        N0_STANDARD_ROTATION,
        f3pAdjust,
        sps,
        ElementalStates.AF3
      );
      setStandardPotency(potency);
      setStandardTotalTime(time);
    },
    [f3pAdjust, sps, startCalculation]
  );

  // calculate line pps from specified actions
  useEffect(
    function () {
      const { potency, time, detailedActions, f3p } = startCalculation(
        actions,
        f3pAdjust,
        sps,
        startingElement
      );
      setPotency(potency);
      setTotalTime(time);
      setDetailedActions(detailedActions);
      setF3PProducers(f3p);
    },
    [actions, f3pAdjust, sps, startingElement, startCalculation]
  );

  const getDetails = function (): React.ReactNode {
    if (showDetails)
      return (
        <>
          <label
            onClick={() => setShowDetails(false)}
            className="clickable">
            Hide
          </label>
          <Details detailedActions={detailedActions} />
          {f3PProducers > 0 && (
            <F3PDetail
              sps={sps}
              f3PProducers={f3PProducers}
            />
          )}
        </>
      );
    else
      return (
        <label
          onClick={() => setShowDetails(true)}
          className="clickable">
          Show details
        </label>
      );
  };

  return (
    <>
      {actions.length >= 1 && (
        <>
          <div className="card">
            <p className="font-mono">{potency.toFixed(2)} potency</p>
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
