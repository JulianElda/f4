import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { F1, F3, XENO } from "consts/jobactions";
import App from "./app";

describe("general", () => {
  test("renders app", () => {
    render(<App />);

    const titleElement = screen.getByText(/Elenor Duskwing/);
    expect(titleElement).toBeInTheDocument();

    const skillElement = screen.getByText("Skills");
    expect(skillElement).toBeInTheDocument();

    const castsElement = screen.getByText("Casts");
    expect(castsElement).toBeInTheDocument();

    const startingElement = screen.getByText("Starting element");
    expect(startingElement).toBeInTheDocument();

    const spsElement = screen.getByText("Spellspeed");
    expect(spsElement).toBeInTheDocument();

    const presetElement = screen.getByText("Preset lines");
    expect(presetElement).toBeInTheDocument();

    const helpElement = screen.getByText("Help!");
    expect(helpElement).toBeInTheDocument();

    const referencesElement = screen.getByText("References");
    expect(referencesElement).toBeInTheDocument();

    const emptyElement = screen.getByText(/Nothing specified/);
    expect(emptyElement).toBeInTheDocument();
  });
});

describe("add skills to sequences", () => {
  const user = userEvent.setup();

  test("F1", async () => {
    render(<App />);
    await user.click(screen.getByAltText(F1.name));
    expect(screen.getByText(F1.id)).toBeInTheDocument();
  });

  test("F3", async () => {
    render(<App />);
    await user.click(screen.getByAltText(F3.name));
    expect(screen.getByText(F3.id)).toBeInTheDocument();
  });

  test("Xeno", async () => {
    render(<App />);
    await user.click(screen.getByAltText(XENO.name));
    expect(screen.getByText(XENO.id)).toBeInTheDocument();
  });
});
