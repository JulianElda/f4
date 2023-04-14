import { render, screen } from "test/test-utils";
import { Provider } from "react-redux";

import { store } from "store/store";
import ActionList from "./actionlist";
import {
  f1_action,
  f3_action,
  f3p_action,
  f4_action,
  d_action,
  b1_action,
  b3_action,
  b4_action,
  pd_action,
  t3p_action,
  xeno_action,
  tpose_action,
  swiftcast_action,
  triplecast_action,
  manafont_action,
  lucid_action,
  filler_action,
} from "consts/actions";

test("render actions", async () => {
  render(
    <Provider store={store}>
      <ActionList />
    </Provider>
  );

  [
    f1_action.name,
    f3_action.name,
    f3p_action.name,
    f4_action.name,
    d_action.name,
    b1_action.name,
    b3_action.name,
    b4_action.name,
    pd_action.name,
    t3p_action.name,
    xeno_action.name,
    tpose_action.name,
    swiftcast_action.name,
    triplecast_action.name,
    manafont_action.name,
    lucid_action.name,
    filler_action.name,
  ].forEach((text: string) => {
    expect(screen.getByAltText(text)).toBeInTheDocument();
  });
});
