import { useAppDispatch, useAppSelector } from "store/hooks";
import { getF3p, setF3p } from "store/config";

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
