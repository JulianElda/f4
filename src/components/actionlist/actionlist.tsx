import {
  f1_action,
  f3_action,
  f4_action,
  d_action,
  b3_action,
  b4_action,
  pd_action,
  t3p_action,
  xeno_action,
} from "consts/actions";
import Action, { ActionType } from "components/action/action";

type ActionListProps = {
  clickAction: (action: ActionType) => void;
};

// starting actions, standard line
// in order:
// B3 B4 PD F3 3xF4 PD 3xF4 Desp

export default function ActionList(props: ActionListProps) {
  return (
    <div className="my-4">
      <label className="font-semibold">Skills</label>
      <div className="bg-white shadow rounded space-y-2 mt-1 p-2">
        <div className="space-x-2">
          <Action action={f1_action} click={props.clickAction} />
          <Action action={f3_action} click={props.clickAction} />
          <Action action={f4_action} click={props.clickAction} />
          <Action action={d_action} click={props.clickAction} />
          <Action action={b3_action} click={props.clickAction} />
          <Action action={b4_action} click={props.clickAction} />
          <Action action={pd_action} click={props.clickAction} />
        </div>
        <div className="space-x-2">
          <Action action={t3p_action} click={props.clickAction} />
          <Action action={xeno_action} click={props.clickAction} />
        </div>
      </div>
    </div>
  );
}