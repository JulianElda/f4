import F3PAdjust from "components/f3padjust/f3padjust";
import SpSCalculator from "components/spscalculator/spscalculator";
import StartElement from "components/startelement/startelement";

export default function Settings() {
  return (
    <div className="my-4 space-y-2">
      <label className="font-semibold">Settings</label>
      <div className="card">
        <StartElement />
        <SpSCalculator />
        <F3PAdjust />
      </div>
    </div>
  );
}
