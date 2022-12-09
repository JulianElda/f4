import { Dispatch, useState } from "react";

type F3PAdjustProps = {
  setF3PAdjust?: Dispatch<boolean>;
};

export default function F3PAdjust(props: F3PAdjustProps) {
  const [f3pAdjust, setF3PAdjust] = useState<boolean>(true);

  const onChangeF3PAdjust = function (newF3PAdjust) {
    setF3PAdjust(newF3PAdjust);
    props.setF3PAdjust?.(newF3PAdjust);
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
