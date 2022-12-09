import { useAppDispatch, useAppSelector } from "store/hooks";
import { getf3p, setf3p } from "store/f3p";

export default function F3PAdjust() {
  const dispatch = useAppDispatch();
  const f3pAdjust = useAppSelector(getf3p);

  const onChangeF3PAdjust = function (newF3PAdjust) {
    dispatch(setf3p(newF3PAdjust));
  };

  return (
    <div className="w-full">
      <input
        type="checkbox"
        id="f3p"
        name="f3p"
        checked={f3pAdjust}
        onChange={(event) => onChangeF3PAdjust(event.target.checked)}
        className="input mr-2"
      />
      <label
        htmlFor="f3p"
        className="text-sm">
        include estimated F3P pps
      </label>
    </div>
  );
}
