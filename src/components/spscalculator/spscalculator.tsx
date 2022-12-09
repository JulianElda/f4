import { useAppDispatch, useAppSelector } from "store/hooks";
import { getSps, setSps } from "store/config";
import { calculateRecast } from "consts/utils";

import classes from "./spscalculator.module.css";

export default function SpSCalculator() {
  const dispatch = useAppDispatch();

  const sps = useAppSelector(getSps);

  const onChangeSps = function (newSps) {
    dispatch(setSps(newSps));
  };

  return (
    <div>
      <label
        htmlFor="sps"
        className="text-sm">
        Spellspeed
      </label>
      <input
        type="number"
        id="sps"
        name="sps"
        value={sps}
        onChange={(event) => onChangeSps(event.target.value)}
        className="input w-full"
      />
      <p className={classes.spellspeeds}>
        <span className="text-sm">
          2.5: &nbsp;
          <label>{calculateRecast(sps, 2500).toFixed(2)}</label>
        </span>
        <span className="text-sm">
          2.8: &nbsp;
          <label>{calculateRecast(sps, 2800).toFixed(2)}</label>
        </span>
        <span className="text-sm">
          3.0: &nbsp;
          <label>{calculateRecast(sps, 3000).toFixed(2)}</label>
        </span>
        <span className="text-sm">
          3.5: &nbsp;
          <label>{calculateRecast(sps, 3500).toFixed(2)}</label>
        </span>
      </p>
    </div>
  );
}
