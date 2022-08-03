import { ActionType } from "components/action/action";
import { L0_STANDARD_ROTATION, L13_5F4 } from "consts/lines";

type PresetProps = {
  setActions: Function;
};

export default function Preset(props: PresetProps) {
  const PRESET_LINES = {
    Clear: [],
    "(0) Standard": L0_STANDARD_ROTATION,
    "(13) 5xF4": L13_5F4,
  };

  const getPresets = function (): React.ReactNode {
    let content: React.ReactNode[] = [];
    for (let key in PRESET_LINES) {
      content.push(
        <PresetItem
          key={key}
          lineName={key}
          lineActions={PRESET_LINES[key]}
          setActions={props.setActions}
        />
      );
    }
    return content;
  };

  return (
    <div className="my-4">
      <label className="font-semibold">Preset lines</label>
      <div className="bg-white shadow rounded space-y-1 mt-1 p-2">
        {getPresets()}
      </div>
    </div>
  );
}

type PresetItemProps = {
  lineName: string;
  lineActions: ActionType[];
  setActions: Function;
};

function PresetItem(props: PresetItemProps) {
  return (
    <p
      className="text-sm underline cursor-pointer"
      onClick={() => {
        props.setActions(props.lineActions);
      }}>
      {props.lineName}
    </p>
  );
}
