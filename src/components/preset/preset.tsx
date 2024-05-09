import { Card } from "@julianelda/scratchpad";
import classes from "assets/styles/globals.module.css";
import { ActionType } from "components/action/action";
import SectionHeader from "components/sectionheader/sectionheader";
import { ElementalStates } from "consts/jobactions";
import {
  I5_3xF4_TRANSPOSE,
  N0_STANDARD_ROTATION,
  N10_4F4,
  N111_DOUBLE_TRANSPOSE_F3P,
  N13_5F4,
  N15_DOUBLE_PARADOX,
  N16_1_DOUBLE_PARADOX_AF2,
  N3_STANDARD_UI_PD_SKIP,
  N4_STANDARD_5F4,
} from "consts/lines";
import { setActions } from "store/actions";
import { setStartingElement } from "store/config";
import { useAppDispatch } from "store/hooks";

type PresetLine = {
  line: ActionType[];
  startingElement: ElementalStates;
};

export default function Preset() {
  const dispatch = useAppDispatch();

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
    const content: React.ReactNode[] = [];
    for (const key in PRESET_LINES) {
      content.push(
        <p
          key={key}
          className={classes.clickable}
          onClick={() => {
            dispatch(setActions(PRESET_LINES[key].line));
            dispatch(setStartingElement(PRESET_LINES[key].startingElement));
          }}>
          {key}
        </p>
      );
    }
    return content;
  };

  return (
    <div className="my-4">
      <SectionHeader text="Preset lines" />
      <Card>
        <div className="space-y-1">{getPresets()}</div>
      </Card>
    </div>
  );
}
