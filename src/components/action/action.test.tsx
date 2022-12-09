import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { f3_action } from "consts/actions";
import Action from "./action";

test("render action image", async () => {
  const mockClick = vi.fn();
  render(
    <Action
      action={f3_action}
      click={mockClick}
    />
  );

  const imageElement = screen.getByAltText(f3_action.name);
  expect(imageElement).toBeInTheDocument();

  const user = userEvent.setup();
  await user.click(screen.getByAltText(f3_action.name));
  expect(mockClick).toBeCalled();
});
