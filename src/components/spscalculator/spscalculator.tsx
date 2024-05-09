import { Input } from "@julianelda/scratchpad";
import { calculateRecast } from "consts/utils";
import { getSps, setSps } from "store/config";
import { useAppDispatch, useAppSelector } from "store/hooks";

export default function SpSCalculator() {
  const dispatch = useAppDispatch();

  const sps = useAppSelector(getSps);

  const onChangeSps = function (newSps) {
    dispatch(setSps(newSps));
  };

  return (
    <div>
      <Input
        id="sps"
        label="Spellspeed"
        type="number"
        value={sps}
        onChange={onChangeSps}
      />
      <p className="mt-2 grid grid-rows-3 content-between px-2">
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
