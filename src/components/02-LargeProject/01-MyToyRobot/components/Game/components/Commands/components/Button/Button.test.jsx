import { vi } from "vitest";
import Button from "./Button";
import { render, screen } from "@testing-library/react";

test("render button with children", () => {
  render(<Button>Click me</Button>);
  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent("Click me");
});

test("button click calls onClick handler", () => {
  const onClick = vi.fn();
  render(<Button onClick={onClick}>Click me</Button>);
  const button = screen.getByRole("button");
  button.click();
  expect(onClick).toHaveBeenCalledTimes(1);
});
