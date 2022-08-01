import { L1_STANDARD_ROTATION, L13_5F4 } from "consts/lines";

type PresetProps = {
  setActions: Function;
};

export default function Preset(props: PresetProps) {
  const PRESET_STYLE: string = "text-sm underline cursor-pointer";
  return (
    <div className="my-4">
      <label className="font-semibold">Preset lines</label>
      <div className="bg-white shadow rounded space-y-1 mt-1 p-2">
        <p
          className={PRESET_STYLE}
          onClick={() => {
            props.setActions([]);
          }}>
          Clear
        </p>
        <p
          className={PRESET_STYLE}
          onClick={() => {
            props.setActions(L1_STANDARD_ROTATION);
          }}>
          (1) Standard without F3P
        </p>
        <p
          className={PRESET_STYLE}
          onClick={() => {
            props.setActions(L13_5F4);
          }}>
          (13) 5xF4
        </p>
      </div>
    </div>
  );
}
