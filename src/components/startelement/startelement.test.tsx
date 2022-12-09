import { render, screen, userEvent } from "test/test-utils";

import { ElementalStates } from "consts/jobactions";
import StartElement from "./startelement";

test("select starting element", async () => {
  const user = userEvent.setup();
  render(<StartElement />);

  const startingElement = screen.getByLabelText("Starting element");
  await user.selectOptions(startingElement, ElementalStates.UI1);

  expect(screen.getByText(ElementalStates.UI1)).toBeVisible();
});
