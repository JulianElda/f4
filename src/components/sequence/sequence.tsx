import Action, { ActionType } from "components/action/action";

export default function Sequence(props) {
  const clickAction = function () {};

  const getSequenceContent = function () {
    return props.actions.slice().map(function (action: ActionType) {
      return <Action action={action} click={clickAction} key={Math.random()} />;
    });
  };

  return <div className="space-x-2">{getSequenceContent()}</div>;
}
