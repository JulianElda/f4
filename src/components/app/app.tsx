import { useState } from "react";

import { ActionType } from "components/action/action";
import ActionList, {
  STANDARD_ROTATION,
} from "components/actionlist/actionlist";
import Calculator from "components/calculator/calculator";
import Header from "components/header/header";
import References from "components/references/references";
import Sequence from "components/sequence/sequence";

export default function App() {
  const [actions, setActions] = useState<ActionType[]>(STANDARD_ROTATION);

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
        <Sequence actions={actions} clickAction={removeActions} />
        <Calculator actions={actions} />
        <ActionList clickAction={addActions} />
        <References />
      </div>
    </div>
  );
}
