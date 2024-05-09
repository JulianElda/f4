import { Card, Hyperlink } from "@julianelda/scratchpad";
import SectionHeader from "components/sectionheader/sectionheader";

export default function References() {
  return (
    <div className="my-4">
      <SectionHeader text="References" />
      <Card>
        <div className="space-y-1">
          <p>
            <Hyperlink
              title="6.x Advanced Non-Standard BLM Guide"
              href="https://docs.google.com/document/d/19CRphCuWdqvcS6I4HMoFSABTi1QrLQYCcIOJ2Sykbrw"
            />
          </p>
          <p>
            <Hyperlink
              title="6.X BLM lines comparison sheet"
              href="https://docs.google.com/spreadsheets/d/1K57e7zFoCuLDLX2kbCAlRBrJO6LS42ifz7e5DQEPn8E"
            />
          </p>
        </div>
      </Card>
    </div>
  );
}
