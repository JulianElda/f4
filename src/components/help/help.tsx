import { Card, Hyperlink } from "@julianelda/scratchpad";
import classes from "assets/styles/globals.module.css";

export default function Help() {
  return (
    <div className="my-4">
      <h2 className={classes.header}>Help!</h2>
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
