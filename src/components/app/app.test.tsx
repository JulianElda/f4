import { Provider } from "react-redux";
import { store } from "store/store";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { F1, F3, XENO } from "consts/jobactions";
import App from "./app";

describe("general", () => {
  test("renders app", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

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
  test("F1", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const user = userEvent.setup();
    await user.click(screen.getByAltText(F1.name));
    expect(screen.getByText(F1.id)).toBeInTheDocument();
  });

  test.skip("F3", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const user = userEvent.setup();
    await user.click(screen.getByAltText(F3.name));
    expect(screen.getByText(F3.id)).toBeInTheDocument();
  });

  test.skip("Xeno", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const user = userEvent.setup();
    await user.click(screen.getByAltText(XENO.name));
    expect(screen.getByText(XENO.id)).toBeInTheDocument();
  });
});

describe("calculate lines", () => {
  test("(N0) Standard", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const user = userEvent.setup();
    await user.click(screen.getByText("(N0) Standard"));
    expect(screen.getByText("5821.20 potency")).toBeInTheDocument();
    expect(screen.getByText("34.20 s")).toBeInTheDocument();
    expect(screen.getByText("170.21 pps")).toBeInTheDocument();
    expect(
      screen.getByText("B3 B4 PD F3 F4 F4 F4 PD F4 F4 F4 Desp")
    ).toBeInTheDocument();
  });

  test("(N15) Double Paradox", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const user = userEvent.setup();
    await user.click(screen.getByText("(N15) Double Paradox"));
    expect(screen.getByText("4923.52 potency")).toBeInTheDocument();
    expect(screen.getByText("29.10 s")).toBeInTheDocument();
    expect(screen.getByText("169.19 pps")).toBeInTheDocument();
    expect(
      screen.getByText("B3 B4 PD Tpose PD F1 F4 F4 F4 F4 Desp")
    ).toBeInTheDocument();
  });
});
