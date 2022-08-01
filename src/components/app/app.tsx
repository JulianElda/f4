import { useState } from "react";

import { L1_STANDARD_ROTATION } from "consts/lines";

import { ActionType } from "components/action/action";
import ActionList from "components/actionlist/actionlist";
import Calculator from "components/calculator/calculator";
import Header from "components/header/header";
import Preset from "components/preset/preset";
import References from "components/references/references";
import Sequence from "components/sequence/sequence";

export default function App() {
  const [actions, setActions] = useState<ActionType[]>(L1_STANDARD_ROTATION);

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
    <div className="min-h-full flex flex-col max-w-lg mx-auto py-4">
      <div className="w-full">
        <Header />
        <ActionList clickAction={addActions} />
        <Sequence actions={actions} clickAction={removeActions} />
        <Calculator actions={actions} />
        <Preset setActions={setActions} />
        <References />
      </div>
    </div>
  );
}
