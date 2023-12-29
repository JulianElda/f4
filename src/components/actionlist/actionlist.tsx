import classes from "assets/styles/globals.module.css";
import Action, { ActionType } from "components/action/action";
import {
  b1_action,
  b3_action,
  b4_action,
  d_action,
  f1_action,
  f3_action,
  f3p_action,
  f4_action,
  filler_action,
  lucid_action,
  manafont_action,
  pd_action,
  swiftcast_action,
  t3p_action,
  tpose_action,
  triplecast_action,
  xeno_action,
} from "consts/actions";
import { addAction } from "store/actions";
import { useAppDispatch } from "store/hooks";

export default function ActionList() {
  const dispatch = useAppDispatch();

  const onClickAction = (action: ActionType) => {
    dispatch(addAction(action));
  };

  return (
    <div className="my-4">
      <h2 className={classes.header}>Skills</h2>
      <div className={classes.card}>
        <div className="">
          <Action
            action={f1_action}
            click={onClickAction}
          />
          <Action
            action={f3_action}
            click={onClickAction}
          />
          <Action
            action={f4_action}
            click={onClickAction}
          />
          <Action
            action={d_action}
            click={onClickAction}
          />
          <Action
            action={b1_action}
            click={onClickAction}
          />
          <Action
            action={b3_action}
            click={onClickAction}
          />
          <Action
            action={b4_action}
            click={onClickAction}
          />
          <Action
            action={pd_action}
            click={onClickAction}
          />
          <Action
            action={f3p_action}
            click={onClickAction}
          />
          <Action
            action={t3p_action}
            click={onClickAction}
          />
          <Action
            action={xeno_action}
            click={onClickAction}
          />
          <Action
            action={tpose_action}
            click={onClickAction}
          />
          <Action
            action={swiftcast_action}
            click={onClickAction}
          />
          <Action
            action={triplecast_action}
            click={onClickAction}
          />
          <Action
            action={manafont_action}
            click={onClickAction}
          />
          <Action
            action={lucid_action}
            click={onClickAction}
          />
          <Action
            action={filler_action}
            click={onClickAction}
          />
        </div>
      </div>
    </div>
  );
}
