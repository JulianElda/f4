import classes from "assets/styles/globals.module.css";
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

  return (
    <div className="w-full">
      <label
        htmlFor="startingelement"
        className={classes.inputlabel}>
        Starting element
      </label>
      <select
        id="startingelement"
        name="startingelement"
        className="inputfield"
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
