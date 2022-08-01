import { JobActionType } from "consts/jobactions";

import { ActionType } from "components/action/action";
import { ElementalStates, ELEMENTAL_MULTIPLIERS } from "consts/jobactions";

type CalculatorProps = {
  actions: ActionType[];
};

export default function Calculator(props: CalculatorProps) {
  const calculateTotalPotency = function (jobActions: JobActionType[]): number {
    let currentElement = ElementalStates.UI3;
    let totalPotency: number = 0;

    for (let i = 0; i < jobActions.length; i++) {
      let action: JobActionType = jobActions[i];

      let gcdPotency =
        action.potency * ELEMENTAL_MULTIPLIERS[action.element][currentElement];

      totalPotency += gcdPotency;

      switch (action.id) {
        case "f3":
          currentElement = ElementalStates.AF3;
          break;
        case "b3":
          currentElement = ElementalStates.UI3;
          break;
      }
    }
    return totalPotency;
  };

  return <p>{calculateTotalPotency(props.actions)}</p>;
}
