import { useAppDispatch, useAppSelector } from "store/hooks";
import { getActions, removeActionFromIndex } from "store/actions";
import Action, { ActionType } from "components/action/action";

/**
 * show specified line
 */
export default function Sequence() {
  const dispatch = useAppDispatch();

  const actions = useAppSelector(getActions);

  // loop through given actions
  const getSequenceContent = function (): React.ReactNode {
    const content: React.ReactNode[] = [];
    for (let i = 0; i < actions.length; i++) {
      content.push(
        <span key={Math.random() * 100 + "" + i}>
          <Action
            action={actions[i]}
            click={() => dispatch(removeActionFromIndex(i))}
          />
          <span className="mr-1 text-slate-600">&gt;</span>
        </span>
      );
    }

    return content;
  };

  const getLineNotation = function (): React.ReactNode {
    return actions
      .map(function (action: ActionType) {
        return action.id;
      })
      .join(" ");
  };

  return (
    <div className="my-4">
      <label className="font-semibold">Casts</label>
      {actions.length === 0 && (
        <>
          <div className="card">
            <p>Nothing specified, add actions from (Skills) or (Preset)</p>
          </div>
        </>
      )}
      {actions.length >= 1 && (
        <>
          <div className="card">{getSequenceContent()}</div>
          <p className="font-mono text-sm mx-2">{getLineNotation()}</p>
        </>
      )}
    </div>
  );
}
