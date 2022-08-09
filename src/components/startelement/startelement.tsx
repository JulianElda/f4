import { useEffect, useState } from "react";
import { ElementalStates } from "consts/jobactions";

type StartElementProps = {
  startingElement: ElementalStates;
  setStartingElement?: Function;
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
    <div className="my-4">
      <label htmlFor="startingelement" className="font-semibold">
        Starting element
      </label>
      <div className="bg-white shadow rounded space-y-2 mt-1 p-2">
        <div>
          <select
            id="startingelement"
            name="startingelement"
            className="shadow-sm bg-white focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
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
      </div>
    </div>
  );
}
