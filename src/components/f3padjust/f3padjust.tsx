import { Checkbox } from "@julianelda/scratchpad";
import { getF3p, setF3p } from "store/config";
import { useAppDispatch, useAppSelector } from "store/hooks";

export default function F3PAdjust() {
  const dispatch = useAppDispatch();
  const f3pAdjust = useAppSelector(getF3p);

  const onChangeF3PAdjust = function (newF3PAdjust) {
    dispatch(setF3p(newF3PAdjust));
  };

  return (
    <div className="w-full">
      <Checkbox
        id="f3p"
        label="include estimated F3P pps"
        value={f3pAdjust}
        onChange={(value) => onChangeF3PAdjust(value)}
      />
    </div>
  );
}
