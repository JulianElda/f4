import { render, screen } from "@testing-library/react";
import Help from "./help";

test("renders help", () => {
  render(<Help />);
  expect(screen.getByText(/readme/)).toBeInTheDocument();
});
