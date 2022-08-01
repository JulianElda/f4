import { JobActionType } from "consts/jobactions";

export type ActionType = {
  icon: string;
} & JobActionType;

type ActionProps = {
  action: ActionType;
  click: Function;
};

export default function Action(props: ActionProps) {
  return (
    <img
      width="32"
      height="32"
      className="inline"
      src={props.action.icon}
      alt={props.action.name}
      onClick={() => props.click(props.action)}
    />
  );
}
