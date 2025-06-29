import { vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Game from "./Game";

function placeRobot(x = 0, y = 0, face = "North") {
  fireEvent.change(screen.getByLabelText(/X/i), { target: { value: x } });
  fireEvent.change(screen.getByLabelText(/Y/i), { target: { value: y } });
  fireEvent.change(screen.getByLabelText(/Facing/i), { target: { value: face } });
  fireEvent.click(screen.getByRole("button", { name: /Place Robot/i }));
}

test("renders Robot component", () => {
  render(<Game />);
  expect(screen.getByTestId("robot")).toBeInTheDocument();
});

test("place robot and report position", async () => {
  render(<Game />);
  placeRobot(2, 3, "East");
  fireEvent.click(screen.getByRole("button", { name: /Report/i }));
  expect(
    await screen.findByText((content, node) => /2.*3.*East/i.test(content))
  ).toBeInTheDocument();
});

test("move robot forward", () => {
  render(<Game />);
  placeRobot(1, 1, "North");
  fireEvent.click(screen.getByRole("button", { name: /Move/i }));
  fireEvent.click(screen.getByRole("button", { name: /Report/i }));
  expect(screen.getByText(/Robot is at position \(1, 0\) facing North/i)).toBeInTheDocument();
});

test("rotate robot left and right", () => {
  render(<Game />);
  placeRobot(1, 1, "North");
  fireEvent.click(screen.getByRole("button", { name: /Left/i }));
  fireEvent.click(screen.getByRole("button", { name: /Report/i }));
  expect(screen.getByText(/facing West/i)).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: /Right/i }));
  fireEvent.click(screen.getByRole("button", { name: /Report/i }));
  expect(screen.getByText(/facing North/i)).toBeInTheDocument();
});

test("robot cannot move off the board", () => {
  render(<Game />);
  placeRobot(0, 0, "West");
  fireEvent.click(screen.getByRole("button", { name: /Move/i }));
  expect(screen.getByText(/fall off the board/i)).toBeInTheDocument();
});
