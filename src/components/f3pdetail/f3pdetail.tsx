import {
  MULTIPLIER_POTENCY,
  ElementalStates,
  ActionElements,
  F3,
} from "consts/jobactions";
import { calculateRecast } from "consts/utils";

import classes from "./f3pdetail.module.css";

type F3PDetailProps = {
  f3PProducers: number;
  sps: number;
};
export default function F3PDetail(props: F3PDetailProps) {
  // 40% chance of producing F3P
  const f3pProc = 0.4;
  const procChance: number =
    // 100%
    1 -
    Math.pow(
      // probability of NOT getting a proc in one cast
      1 - f3pProc,
      // squared by how many casts
      props.f3PProducers
    );

  return (
    <div className={classes.f3pdetail}>
      <div>
        <span className="font-semibold">
          Fire III producers: {props.f3PProducers}
        </span>
      </div>
      <div>
        <span>Probability of proccing at least 1 F3P: {procChance * 100}%</span>
      </div>
      <div>
        <span>
          Estimated potency: {procChance} probability *{" "}
          {MULTIPLIER_POTENCY[ActionElements.FIRE][ElementalStates.AF3]} AF3 *{" "}
          {F3.potency} ={" "}
          {(
            procChance *
            F3.potency *
            MULTIPLIER_POTENCY[ActionElements.FIRE][ElementalStates.AF3]
          ).toFixed(2)}
        </span>
      </div>
      <div>
        <span>
          Estimated time: {procChance} probability *{" "}
          {calculateRecast(props.sps, 2500)} recast ={" "}
          {(procChance * calculateRecast(props.sps, 2500)).toFixed(2)}
        </span>
      </div>
    </div>
  );
}
