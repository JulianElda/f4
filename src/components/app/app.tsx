import { useState } from "react";

import { ElementalStates } from "consts/jobactions";
import { ActionType } from "components/action/action";
import ActionList from "components/actionlist/actionlist";
import Calculator from "components/calculator/calculator";
import Header from "components/header/header";
import Help from "components/help/help";
import Preset from "components/preset/preset";
import References from "components/references/references";
import Sequence from "components/sequence/sequence";
import Settings from "components/settings/settings";

export default function App() {
  const [actions, setActions] = useState<ActionType[]>([]);
  const [sps, setSps] = useState<number>(380);
  const [f3pAdjust, setF3PAdjust] = useState<boolean>(true);
  const [startingElement, setStartingElement] = useState<ElementalStates>(
    ElementalStates.AF3
  );

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
    <div className="min-h-full flex flex-col max-w-4xl mx-auto py-4">
      <div className="w-full">
        <Header />
        <div className="grid grid-cols-2 md:space-x-8">
          <div className="col-span-2 md:col-span-1">
            <ActionList clickAction={addActions} />
            <Sequence actions={actions} clickAction={removeActions} />
            <Calculator
              actions={actions}
              f3pAdjust={f3pAdjust}
              sps={sps}
              startingElement={startingElement}
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <Settings
              setF3PAdjust={setF3PAdjust}
              setSps={setSps}
              startingElement={startingElement}
              setStartingElement={setStartingElement}
            />
            <Preset
              setActions={setActions}
              setStartingElement={setStartingElement}
            />
            <Help />
            <References />
          </div>
        </div>
      </div>
    </div>
  );
}
