import {
  f1_action,
  f3_action,
  f4_action,
  d_action,
  b3_action,
  b4_action,
  pd_action,
} from "consts/actions";
import Action, { ActionType } from "components/action/action";

type ActionListProps = {
  clickAction: (action: ActionType) => void;
};

// starting actions, standard line
// in order:
// B3 B4 PD F3 3xF4 PD 3xF4 Desp
export const STANDARD_ROTATION: ActionType[] = [
  b3_action,
  b4_action,
  pd_action,
  f3_action,
  f4_action,
  f4_action,
  f4_action,
  pd_action,
  f4_action,
  f4_action,
  f4_action,
  d_action,
];

export default function ActionList(props: ActionListProps) {
  return (
    <div className="my-4">
      <label className="font-semibold">Skills</label>
      <div className="bg-white shadow rounded space-x-2 mt-1 p-2">
        <Action action={f1_action} click={props.clickAction} />
        <Action action={f3_action} click={props.clickAction} />
        <Action action={f4_action} click={props.clickAction} />
        <Action action={d_action} click={props.clickAction} />
        <Action action={b3_action} click={props.clickAction} />
        <Action action={b4_action} click={props.clickAction} />
        <Action action={pd_action} click={props.clickAction} />
      </div>
    </div>
  );
}
