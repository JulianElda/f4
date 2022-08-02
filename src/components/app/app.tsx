import { useState } from "react";

import { ActionType } from "components/action/action";
import ActionList from "components/actionlist/actionlist";
import Calculator from "components/calculator/calculator";
import Header from "components/header/header";
import Preset from "components/preset/preset";
import References from "components/references/references";
import Sequence from "components/sequence/sequence";
import SpSCalculator from "components/spscalculator/spscalculator";

export default function App() {
  const [actions, setActions] = useState<ActionType[]>([]);
  const [sps, setSps] = useState<number>(380);

  // add new action at the end
  const addActions = function (newAction: ActionType) {
    setActions((prevActions: ActionType[]) =>
      prevActions.slice().concat(newAction)
    );
  };

  // remove action of specified index
  const removeActions = function (index: number) {
    setActions((prevActions) => prevActions.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-full flex flex-col max-w-2xl mx-auto py-4">
      <div className="w-full">
        <Header />
        <div className="grid grid-cols-2 md:space-x-8">
          <div className="col-span-2 md:col-span-1">
            <ActionList clickAction={addActions} />
            <Sequence actions={actions} clickAction={removeActions} />
            <Calculator actions={actions} sps={sps} />
          </div>
          <div className="col-span-2 md:col-span-1">
            <SpSCalculator setSps={setSps} />
            <Preset setActions={setActions} />
            <References />
          </div>
        </div>
      </div>
    </div>
  );
}
