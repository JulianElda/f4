import { Card } from "@julianelda/scratchpad";
import Action from "components/action/action";
import SectionHeader from "components/sectionheader/sectionheader";
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
      <SectionHeader text="Casts" />
      {actions.length === 0 && (
        <Card>
          <div className="space-y-1">
            <p>
              Nothing specified, add actions from (Skills) or (Preset lines)
            </p>
          </div>
        </Card>
      )}
      {actions.length >= 1 && (
        <Card>
          <div className="space-y-1">{getSequenceContent()}</div>
        </Card>
      )}
    </div>
  );
}
