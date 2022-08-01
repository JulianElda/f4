import { JobActionType } from "consts/jobactions";

// extend JobActionType with additional icon
export type ActionType = {
  icon: string;
} & JobActionType;

type ActionProps = {
  action: ActionType;
  click: (action: ActionType) => void;
};

const WIDTH: string = "32";
const HEIGHT: string = "32";

export default function Action(props: ActionProps) {
  return (
    <img
      width={WIDTH}
      height={HEIGHT}
      className="inline cursor-pointer"
      src={props.action.icon}
      alt={props.action.name}
      onClick={() => props.click(props.action)}
    />
  );
}
