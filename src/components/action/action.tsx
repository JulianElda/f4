import { JobActionType } from "consts/jobactions";

import classes from "./action.module.css";

// extend JobActionType with additional icon
export type ActionType = {
  icon: string;
} & JobActionType;

type ActionProps = {
  action: ActionType;
  click: (action: ActionType) => void;
};

const WIDTH = "40";
const HEIGHT = "40";

export default function Action(props: ActionProps) {
  return (
    <img
      width={WIDTH}
      height={HEIGHT}
      className={classes.action}
      src={props.action.icon}
      alt={props.action.name}
      onClick={() => props.click(props.action)}
    />
  );
}
