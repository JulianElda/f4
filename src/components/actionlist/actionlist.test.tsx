import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { f3_action } from "consts/actions";

import ActionList from "./actionlist";

test("render actions", async () => {
  const user = userEvent.setup();
  const mockClick = vi.fn();

  render(<ActionList />);

  expect(screen.getByAltText(f3_action.name)).toBeInTheDocument();
  await user.click(screen.getByAltText(f3_action.name));
  expect(mockClick).toBeCalled();
});
