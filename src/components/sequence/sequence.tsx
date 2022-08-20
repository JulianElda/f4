import Action, { ActionType } from "components/action/action";

type SequenceProps = {
  actions: ActionType[];
  clickAction: (index: number) => void;
};

/**
 * show specified line
 */
export default function Sequence(props: SequenceProps) {
  // loop through given actions
  const getSequenceContent = function (): React.ReactNode {
    let content: React.ReactNode[] = [];
    for (let i = 0; i < props.actions.length; i++) {
      content.push(
        <span key={Math.random() * 100 + "" + i}>
          <Action
            action={props.actions[i]}
            click={(_action: ActionType) => props.clickAction(i)}
          />
          <span className="mr-1 text-slate-600">&gt;</span>
        </span>
      );
    }

    return content;
  };

  const getLineNotation = function (): React.ReactNode {
    return props.actions
      .map(function (action: ActionType) {
        return action.id;
      })
      .join(" ");
  };

  return (
    <div className="my-4">
      <label className="font-semibold">Casts</label>
      {props.actions.length === 0 && (
        <>
          <div className="card">
            <p>Nothing specified, add actions from (Skills) or (Preset)</p>
          </div>
        </>
      )}
      {props.actions.length >= 1 && (
        <>
          <div className="card">{getSequenceContent()}</div>
          <p className="font-mono text-sm mx-2">{getLineNotation()}</p>
        </>
      )}
    </div>
  );
}
