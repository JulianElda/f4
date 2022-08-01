import { useState } from "react";

export default function SpSCalculator() {
  const [sps, setSps] = useState<number>(380);

  const calculateSps = function (input: number, base: number = 2500): number {
    if (input < 400) input = 400;
    return (
      (100 * ((base * (1000 - (130 * (input - 400)) / 1900)) / 1000 / 1000)) /
      100
    );
  };

  const onChangeSps = function (newSps) {
    setSps(newSps);
  };

  return (
    <div className="my-4">
      <label className="font-semibold">Spellspeed</label>
      <div className="bg-white shadow rounded space-y-2 mt-1 p-2">
        <div>
          <input
            type="number"
            id="sps"
            name="sps"
            value={sps}
            onChange={(event) => onChangeSps(event.target.value)}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <p className="grid grid-rows-3 content-between">
          <span className="text-sm">
            2.5: &nbsp;
            <label>{calculateSps(sps, 2500).toFixed(2)}</label>
          </span>
          <span className="text-sm">
            2.8: &nbsp;
            <label>{calculateSps(sps, 2800).toFixed(2)}</label>
          </span>
          <span className="text-sm">
            3.0: &nbsp;
            <label>{calculateSps(sps, 3000).toFixed(2)}</label>
          </span>
        </p>
      </div>
    </div>
  );
}
