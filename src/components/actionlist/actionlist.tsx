import {
  f1_action,
  f3_action,
  f3p_action,
  f4_action,
  d_action,
  b1_action,
  b3_action,
  b4_action,
  pd_action,
  t3p_action,
  xeno_action,
  tpose_action,
  swiftcast_action,
  triplecast_action,
  lucid_action,
} from "consts/actions";
import Action, { ActionType } from "components/action/action";

type ActionListProps = {
  clickAction: (action: ActionType) => void;
};

export default function ActionList(props: ActionListProps) {
  return (
    <div className="my-4">
      <label className="font-semibold">Skills</label>
      <div className="bg-white shadow rounded space-y-2 mt-1 p-2">
        <div className="">
          <Action action={f1_action} click={props.clickAction} />
          <Action action={f3_action} click={props.clickAction} />
          <Action action={f4_action} click={props.clickAction} />
          <Action action={d_action} click={props.clickAction} />
          <Action action={b1_action} click={props.clickAction} />
          <Action action={b3_action} click={props.clickAction} />
          <Action action={b4_action} click={props.clickAction} />
          <Action action={pd_action} click={props.clickAction} />
          <Action action={f3p_action} click={props.clickAction} />
          <Action action={t3p_action} click={props.clickAction} />
          <Action action={xeno_action} click={props.clickAction} />
          <Action action={tpose_action} click={props.clickAction} />
          <Action action={swiftcast_action} click={props.clickAction} />
          <Action action={triplecast_action} click={props.clickAction} />
          <Action action={lucid_action} click={props.clickAction} />
        </div>
      </div>
    </div>
  );
}
