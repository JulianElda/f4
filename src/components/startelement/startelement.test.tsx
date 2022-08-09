import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ElementalStates } from "consts/jobactions";
import StartElement from "./startelement";

test("select starting element", async () => {
  const user = userEvent.setup();
  render(<StartElement startingElement={ElementalStates.AF3} />);
  const startingElement = screen.getByLabelText("Starting element");

  await user.selectOptions(startingElement, ElementalStates.UI1);
  expect(screen.getByText(ElementalStates.UI1)).toBeVisible();
});
