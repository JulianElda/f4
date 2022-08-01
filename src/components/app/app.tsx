import { useState } from "react";

import { ActionType } from "components/action/action";
import ActionList from "components/actionlist/actionlist";
import Calculator from "components/calculator/calculator";
import Sequence from "components/sequence/sequence";

export default function App() {
  const [actions, setActions] = useState<ActionType[]>([]);

  const addActions = function (newAction: ActionType) {
    setActions((prevActions: ActionType[]) =>
      prevActions.slice().concat(newAction)
    );
  };

  return (
    <div className="min-h-full flex flex-col">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-mono text-2xl text-center mt-1 mb-4">f4</h1>
        <div className="bg-white shadow rounded">
          <div className="">
            <Sequence actions={actions} />
          </div>
          <div className="">
            <Calculator actions={actions} />
          </div>
        </div>

        <ActionList clickAction={addActions} />
      </div>
    </div>
  );
}
