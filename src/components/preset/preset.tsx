import { ActionType } from "components/action/action";
import { ElementalStates } from "consts/jobactions";
import {
  N0_STANDARD_ROTATION,
  N3_STANDARD_UI_PD_SKIP,
  N4_STANDARD_5F4,
  N10_4F4,
  N13_5F4,
  N15_DOUBLE_PARADOX,
  N16_1_DOUBLE_PARADOX_AF2,
  N111_DOUBLE_TRANSPOSE_F3P,
  I5_3xF4_TRANSPOSE,
} from "consts/lines";

type PresetLine = {
  line: ActionType[];
  startingElement: ElementalStates;
};

type PresetProps = {
  setActions: Function;
  setStartingElement: Function;
};

export default function Preset(props: PresetProps) {
  const PRESET_LINES: { [id: string]: PresetLine } = {
    Clear: { line: [], startingElement: ElementalStates.AF3 },
    "(N0) Standard": {
      line: N0_STANDARD_ROTATION,
      startingElement: ElementalStates.AF3,
    },
    "(N3) Standard w UI PD skip": {
      line: N3_STANDARD_UI_PD_SKIP,
      startingElement: ElementalStates.AF3,
    },
    "(N4) Standard w 5xF4": {
      line: N4_STANDARD_5F4,
      startingElement: ElementalStates.AF3,
    },
    "(N10) 4xF4": { line: N10_4F4, startingElement: ElementalStates.AF3 },
    "(N13) 5xF4": { line: N13_5F4, startingElement: ElementalStates.AF3 },
    "(N15) Double Paradox": {
      line: N15_DOUBLE_PARADOX,
      startingElement: ElementalStates.AF3,
    },
    "(N16.1) Double Paradox AF2": {
      line: N16_1_DOUBLE_PARADOX_AF2,
      startingElement: ElementalStates.AF3,
    },
    "(N111) Double Transpose F3P": {
      line: N111_DOUBLE_TRANSPOSE_F3P,
      startingElement: ElementalStates.AF3,
    },
    "(I5) 3xF4 Transpose": {
      line: I5_3xF4_TRANSPOSE,
      startingElement: ElementalStates.UI1,
    },
  };

  const getPresets = function (): React.ReactNode {
    let content: React.ReactNode[] = [];
    for (let key in PRESET_LINES) {
      content.push(
        <PresetItem
          key={key}
          lineName={key}
          lineActions={PRESET_LINES[key].line}
          lineStartingElement={PRESET_LINES[key].startingElement}
          setActions={props.setActions}
          setStartingElement={props.setStartingElement}
        />
      );
    }
    return content;
  };

  return (
    <div className="my-4">
      <label className="font-semibold">Preset lines</label>
      <div className="card">{getPresets()}</div>
    </div>
  );
}

type PresetItemProps = {
  lineName: string;
  lineActions: ActionType[];
  lineStartingElement: ElementalStates;
  setActions: Function;
  setStartingElement: Function;
};

function PresetItem(props: PresetItemProps) {
  return (
    <p
      className="clickable"
      onClick={() => {
        props.setActions(props.lineActions);
        props.setStartingElement(props.lineStartingElement);
      }}>
      {props.lineName}
    </p>
  );
}
