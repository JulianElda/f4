import { Card } from "@julianelda/scratchpad";
import F3PAdjust from "components/f3padjust/f3padjust";
import SectionHeader from "components/sectionheader/sectionheader";
import SpSCalculator from "components/spscalculator/spscalculator";
import StartElement from "components/startelement/startelement";

export default function Settings() {
  return (
    <div className="my-4">
      <SectionHeader text="Settings" />
      <Card>
        <div className="space-y-2">
          <StartElement />
          <SpSCalculator />
          <F3PAdjust />
        </div>
      </Card>
    </div>
  );
}
