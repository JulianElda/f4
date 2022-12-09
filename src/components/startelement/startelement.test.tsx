import { Provider } from "react-redux";
import { store } from "store/store";

import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ElementalStates } from "consts/jobactions";
import StartElement from "./startelement";

test("select starting element", async () => {
  render(
    <Provider store={store}>
      <StartElement />
    </Provider>
  );
  const startingElement = screen.getByLabelText("Starting element");

  await act(async () => {
    const user = userEvent.setup();
    await user.selectOptions(startingElement, ElementalStates.UI1);
  });

  expect(screen.getByText(ElementalStates.UI1)).toBeVisible();
});
