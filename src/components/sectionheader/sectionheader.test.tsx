import { render, screen } from "@testing-library/react";
import SectionHeader from "./sectionheader";

test("renders section header", () => {
  render(<SectionHeader text="section text" />);
  expect(screen.getByText("section text")).toBeInTheDocument();
});
