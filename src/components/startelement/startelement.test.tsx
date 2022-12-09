import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ElementalStates } from "consts/jobactions";
import StartElement from "./startelement";

test("select starting element", async () => {
  render(<StartElement startingElement={ElementalStates.AF3} />);
  const startingElement = screen.getByLabelText("Starting element");

  const user = userEvent.setup();
  await user.selectOptions(startingElement, ElementalStates.UI1);
  expect(screen.getByText(ElementalStates.UI1)).toBeVisible();
});
