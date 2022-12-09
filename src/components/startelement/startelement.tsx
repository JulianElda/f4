import { Dispatch, useEffect, useState } from "react";
import { ElementalStates } from "consts/jobactions";

type StartElementProps = {
  startingElement: ElementalStates;
  setStartingElement?: Dispatch<ElementalStates>;
};

export default function StartElement(props: StartElementProps) {
  const [startingElement, setStartingElement] = useState<ElementalStates>(
    props.startingElement
  );

  const onChangeStartingElement = function (
    newStartingElement: ElementalStates
  ) {
    setStartingElement(newStartingElement);
    props.setStartingElement?.(newStartingElement);
  };

  useEffect(
    function () {
      setStartingElement(props.startingElement);
    },
    [props.startingElement]
  );

  return (
    <div className="w-full">
      <label
        htmlFor="startingelement"
        className="text-sm">
        Starting element
      </label>
      <select
        id="startingelement"
        name="startingelement"
        className="w-full bg-white font-semibold input"
        value={startingElement}
        onChange={(e) =>
          onChangeStartingElement(e.target.value as ElementalStates)
        }>
        <option value={ElementalStates.AF1}>{ElementalStates.AF1}</option>
        <option value={ElementalStates.AF2}>{ElementalStates.AF2}</option>
        <option value={ElementalStates.AF3}>{ElementalStates.AF3}</option>
        <option value={ElementalStates.UI1}>{ElementalStates.UI1}</option>
        <option value={ElementalStates.UI2}>{ElementalStates.UI2}</option>
        <option value={ElementalStates.UI3}>{ElementalStates.UI3}</option>
      </select>
    </div>
  );
}
