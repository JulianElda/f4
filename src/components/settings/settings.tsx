import classes from "assets/styles/globals.module.css";
import F3PAdjust from "components/f3padjust/f3padjust";
import SpSCalculator from "components/spscalculator/spscalculator";
import StartElement from "components/startelement/startelement";

export default function Settings() {
  return (
    <div className="my-4 space-y-2">
      <h2 className={classes.header}>Settings</h2>
      <div className={classes.card + " space-y-4"}>
        <StartElement />
        <SpSCalculator />
        <F3PAdjust />
      </div>
    </div>
  );
}
