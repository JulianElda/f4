import classes from "assets/styles/globals.module.css";
import Action from "components/action/action";
import { getActions, removeActionFromIndex } from "store/actions";
import { useAppDispatch, useAppSelector } from "store/hooks";

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

  return (
    <div className="my-4">
      <h2 className={classes.header}>Casts</h2>
      {actions.length === 0 && (
        <>
          <div className={classes.card}>
            <p>
              Nothing specified, add actions from (Skills) or (Preset lines)
            </p>
          </div>
        </>
      )}
      {actions.length >= 1 && (
        <>
          <div className={classes.card}>{getSequenceContent()}</div>
        </>
      )}
    </div>
  );
}
