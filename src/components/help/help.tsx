import { Card, Hyperlink } from "@julianelda/scratchpad";
import SectionHeader from "components/sectionheader/sectionheader";

export default function Help() {
  return (
    <div className="my-4">
      <SectionHeader text="Help!" />
      <Card>
        <p>
          <Hyperlink
            title="Check the readme"
            href="https://github.com/JulianElda/f4"
          />
        </p>
      </Card>
    </div>
  );
}
