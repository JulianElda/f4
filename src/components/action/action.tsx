import { JobActionType } from "consts/jobactions";

// extend JobActionType with additional icon
export type ActionType = {
  icon: string;
} & JobActionType;

type ActionProps = {
  action: ActionType;
  click: (action: ActionType) => void;
};

export default function Action(props: ActionProps) {
  return (
    <img
      width="40"
      height="40"
      className="mb-2 mr-2 inline cursor-pointer"
      src={props.action.icon}
      alt={props.action.name}
      onClick={() => props.click(props.action)}
    />
  );
}
