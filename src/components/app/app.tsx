import ActionList from "components/actionlist/actionlist";
import Calculator from "components/calculator/calculator";
import Header from "components/header/header";
import Help from "components/help/help";
import Preset from "components/preset/preset";
import References from "components/references/references";
import Sequence from "components/sequence/sequence";
import Settings from "components/settings/settings";

import classes from "./app.module.css";

export default function App() {
  return (
    <div className={classes.app}>
      <Header />
      <div className={classes.container}>
        <div className={classes.column}>
          <ActionList />
          <Sequence />
          <Calculator />
        </div>
        <div className={classes.column}>
          <Settings />
          <Preset />
          <Help />
          <References />
        </div>
      </div>
    </div>
  );
}
