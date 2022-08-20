import { useState } from "react";
import { calculateRecast } from "consts/utils";

type SpSCalculatorProps = {
  setSps?: Function;
};

export default function SpSCalculator(props: SpSCalculatorProps) {
  const [sps, setSps] = useState<number>(380);

  const onChangeSps = function (newSps) {
    setSps(newSps);
    props.setSps?.(newSps);
  };

  return (
    <div>
      <label htmlFor="sps" className="text-sm">
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
      <p className="grid grid-rows-3 mt-2 content-between">
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
