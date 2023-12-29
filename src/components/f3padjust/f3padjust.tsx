import { useAppDispatch, useAppSelector } from "store/hooks";
import { getF3p, setF3p } from "store/config";
import classes from "assets/styles/globals.module.css";

export default function F3PAdjust() {
  const dispatch = useAppDispatch();
  const f3pAdjust = useAppSelector(getF3p);

  const onChangeF3PAdjust = function (newF3PAdjust) {
    dispatch(setF3p(newF3PAdjust));
  };

  return (
    <div className="w-full">
      <input
        type="checkbox"
        id="f3p"
        name="f3p"
        checked={f3pAdjust}
        onChange={(event) => onChangeF3PAdjust(event.target.checked)}
        className={classes.input}
      />
      <label
        htmlFor="f3p"
        className={classes.inputlabel + " ml-1"}>
        include estimated F3P pps
      </label>
    </div>
  );
}
