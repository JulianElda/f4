import { useState } from "react";
import { useAppSelector } from "store/hooks";
import { getActions } from "store/actions";
import { getF3p, getSps, getStartingElement } from "store/config";

import { startCalculation } from "consts/utils";
import { N0_STANDARD_ROTATION } from "consts/lines";
import { ElementalStates } from "consts/jobactions";
import Details from "components/details/details";
import F3PDetail from "components/f3pdetail/f3pdetail";

import classes from "assets/styles/globals.module.css";

export default function Calculator() {
  const actions = useAppSelector(getActions);
  const f3pAdjust = useAppSelector(getF3p);
  const sps = useAppSelector(getSps);
  const startingElement = useAppSelector(getStartingElement);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  // specified rotation
  const {
    potency: totalPotency,
    time: totalTime,
    detailedActions,
    f3p: f3pProducers,
  } = startCalculation(actions, f3pAdjust, sps, startingElement);

  // standard rotation
  const { potency: standardPotency, time: standardTotalTime } =
    startCalculation(N0_STANDARD_ROTATION, f3pAdjust, sps, ElementalStates.AF3);

  const compareStandard = function (): string {
    const standardPps = standardPotency / standardTotalTime;
    const pps = totalPotency / totalTime;

    return ((pps / standardPps) * 100).toFixed(2);
  };

  const getDetails = function (): React.ReactNode {
    if (showDetails)
      return (
        <>
          <label
            onClick={() => setShowDetails(false)}
            className={classes.clickable}>
            Hide
          </label>
          <Details detailedActions={detailedActions} />
          {f3pProducers > 0 && (
            <F3PDetail
              sps={sps}
              f3PProducers={f3pProducers}
            />
          )}
        </>
      );
    else
      return (
        <label
          onClick={() => setShowDetails(true)}
          className={classes.clickable}>
          Show details
        </label>
      );
  };

  return (
    <>
      {actions.length >= 1 && (
        <>
          <div className="card">
            <p>{totalPotency.toFixed(2)} potency</p>
            <p>{totalTime.toFixed(2)} s</p>
            <p>{(totalPotency / totalTime).toFixed(2)} pps</p>
            <p>{compareStandard()}% from standard</p>
            {getDetails()}
          </div>
        </>
      )}
    </>
  );
}
