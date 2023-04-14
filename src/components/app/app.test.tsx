import { render, screen, userEvent } from "test/test-utils";

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

describe("calculate lines", () => {
  test("(N0) Standard", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText("(N0) Standard"));
    expect(screen.getByText("5821.20 potency")).toBeInTheDocument();
    expect(screen.getByText("34.20 s")).toBeInTheDocument();
    expect(screen.getByText("170.21 pps")).toBeInTheDocument();
    expect(
      screen.getByText("B3 B4 PD F3 F4 F4 F4 PD F4 F4 F4 Desp")
    ).toBeInTheDocument();
  });

  test("(N15) Double Paradox", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText("(N15) Double Paradox"));
    expect(screen.getByText("4923.52 potency")).toBeInTheDocument();
    expect(screen.getByText("29.10 s")).toBeInTheDocument();
    expect(screen.getByText("169.19 pps")).toBeInTheDocument();
    expect(
      screen.getByText("B3 B4 PD Tpose PD F1 F4 F4 F4 F4 Desp")
    ).toBeInTheDocument();
  });
});
