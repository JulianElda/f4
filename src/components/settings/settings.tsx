import F3PAdjust from "components/f3padjust/f3padjust";
import SpSCalculator from "components/spscalculator/spscalculator";
import StartElement from "components/startelement/startelement";

export default function Settings(props) {
  return (
    <div className="my-4 space-y-2">
      <label className="font-semibold">Settings</label>
      <div className="bg-white shadow rounded space-y-2 mt-1 p-2">
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
