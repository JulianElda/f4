import { Provider } from "react-redux";
import { store } from "store/store";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SpSCalculator from "./spscalculator";

test("calculate base spellspeed", () => {
  render(
    <Provider store={store}>
      <SpSCalculator />
    </Provider>
  );

  const base25Cast = screen.getByText(/2.50/);
  expect(base25Cast).toBeInTheDocument();

  const base28Cast = screen.getByText(/2.80/);
  expect(base28Cast).toBeInTheDocument();

  const base30Cast = screen.getByText(/3.00/);
  expect(base30Cast).toBeInTheDocument();
});

// crit bis
test("calculate 1352 spellspeed", async () => {
  render(
    <Provider store={store}>
      <SpSCalculator />
    </Provider>
  );

  const inputElement = screen.getByLabelText("Spellspeed");

  const user = userEvent.setup();
  await user.clear(inputElement);
  await user.type(inputElement, "1352");

  const base25Cast = screen.getByText(/2.34/);
  expect(base25Cast).toBeInTheDocument();

  const base28Cast = screen.getByText(/2.62/);
  expect(base28Cast).toBeInTheDocument();

  const base30Cast = screen.getByText(/2.80/);
  expect(base30Cast).toBeInTheDocument();
});

// sps bis
test("calculate 2171 spellspeed", async () => {
  render(
    <Provider store={store}>
      <SpSCalculator />
    </Provider>
  );

  const inputElement = screen.getByLabelText("Spellspeed");

  const user = userEvent.setup();
  await user.clear(inputElement);
  await user.type(inputElement, "2171");

  const base25Cast = screen.getByText(/2.20/);
  expect(base25Cast).toBeInTheDocument();

  const base28Cast = screen.getByText(/2.46/);
  expect(base28Cast).toBeInTheDocument();

  const base30Cast = screen.getByText(/2.64/);
  expect(base30Cast).toBeInTheDocument();
});
