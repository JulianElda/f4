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
import { Provider } from "react-redux";
import { store } from "store/store";
import { render, screen } from "test/test-utils";
import ActionList from "./actionlist";

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
