import { Select } from "@julianelda/scratchpad";
import { ElementalStates } from "consts/jobactions";
import { getStartingElement, setStartingElement } from "store/config";
import { useAppDispatch, useAppSelector } from "store/hooks";

export default function StartElement() {
  const dispatch = useAppDispatch();

  const startingElement = useAppSelector(getStartingElement);

  const onChangeStartingElement = function (
    newStartingElement: ElementalStates
  ) {
    dispatch(setStartingElement(newStartingElement));
  };

  const options = [
    ElementalStates.AF1,
    ElementalStates.AF2,
    ElementalStates.AF3,
    ElementalStates.UI1,
    ElementalStates.UI2,
    ElementalStates.UI3,
  ].map((state) => ({ value: state, label: state }));

  return (
    <div className="w-full">
      <Select
        id="startingelement"
        label="Starting element"
        options={options}
        value={startingElement}
        onChange={(value) => onChangeStartingElement(value as ElementalStates)}
      />
    </div>
  );
}
