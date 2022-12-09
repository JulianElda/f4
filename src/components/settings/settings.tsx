import { ElementalStates } from "consts/jobactions";

import F3PAdjust from "components/f3padjust/f3padjust";
import SpSCalculator from "components/spscalculator/spscalculator";
import StartElement from "components/startelement/startelement";
import { Dispatch } from "react";

type SettingsProps = {
  startingElement: ElementalStates;
  setStartingElement: Dispatch<ElementalStates>;
  setF3PAdjust: Dispatch<boolean>;
  setSps: Dispatch<number>;
};

export default function Settings(props: SettingsProps) {
  return (
    <div className="my-4 space-y-2">
      <label className="font-semibold">Settings</label>
      <div className="card">
        <StartElement
          startingElement={props.startingElement}
          setStartingElement={props.setStartingElement}
        />
        <SpSCalculator setSps={props.setSps} />
        <F3PAdjust setF3PAdjust={props.setF3PAdjust} />
      </div>
    </div>
  );
}
