import { render, screen } from "@testing-library/react";
import Cell from "./Cell"; // Adjust the import path as necessary
import { expect } from "vitest";

test("renders cell with sam,e x,y of accessibility", () => {
  render(<Cell x={1} y={0} />);
  // Add your assertions here
  expect(screen.getByRole("cell", { name: "1, 0" })).toBeInTheDocument(); // Assuming the Cell component renders a div or similar element
});
