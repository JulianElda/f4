import {
  f1_action,
  f3_action,
  f4_action,
  d_action,
  b3_action,
  b4_action,
  pd_action,
} from "consts/actions";
import Action from "components/action/action";

type ActionListProps = {
  clickAction: Function;
};

export default function ActionList(props: ActionListProps) {
  return (
    <div className="space-x-2">
      <Action action={f1_action} click={props.clickAction} />
      <Action action={f3_action} click={props.clickAction} />
      <Action action={f4_action} click={props.clickAction} />
      <Action action={d_action} click={props.clickAction} />
      <Action action={b3_action} click={props.clickAction} />
      <Action action={b4_action} click={props.clickAction} />
      <Action action={pd_action} click={props.clickAction} />
    </div>
  );
}
