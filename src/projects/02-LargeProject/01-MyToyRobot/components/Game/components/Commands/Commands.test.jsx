import { test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Commands from "./Commands";

test("renders Commands component with buttons", () => {
  render(<Commands />);
  const buttons = screen.getAllByRole("button");
  expect(buttons).toHaveLength(4);
  expect(buttons[0]).toHaveTextContent("Move");
  expect(buttons[1]).toHaveTextContent("Left");
  expect(buttons[2]).toHaveTextContent("Right");
  expect(buttons[3]).toHaveTextContent("Report");
});

test("calls onCommandClick when button is clicked", () => {
  const onCommandClick = vi.fn();
  render(<Commands onCommandClick={onCommandClick} isPlaced={true} />);
  
  const moveButton = screen.getByText("Move");
  moveButton.click();
  
  expect(onCommandClick).toHaveBeenCalledWith("Move");
});

test("buttons are disabled when robot is not placed", () => {
  render(<Commands isPlaced={false} />);
  
  const moveButton = screen.getByText("Move");
  const leftButton = screen.getByText("Left");
  const rightButton = screen.getByText("Right");
  
  expect(moveButton).toBeDisabled();
  expect(leftButton).toBeDisabled();
  expect(rightButton).toBeDisabled();
  
  const reportButton = screen.getByText("Report");
  expect(reportButton).not.toBeDisabled();
});