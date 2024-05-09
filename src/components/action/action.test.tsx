import { f3_action } from "consts/actions";
import { render, screen, userEvent } from "test/test-utils";
import Action from "./action";

test("render action image", async () => {
  const mockClick = vi.fn();
  const user = userEvent.setup();
  render(
    <Action
      action={f3_action}
      click={mockClick}
    />
  );

  const imageElement = screen.getByAltText(f3_action.name);
  expect(imageElement).toBeInTheDocument();

  await user.click(screen.getByAltText(f3_action.name));
  expect(mockClick).toBeCalled();
});
