import { render, screen } from "@testing-library/react";
import Board from "./Board";

test("renders 5 rows", () => {
  render(<Board />);
  const rows = screen.getAllByRole("row");
  expect(rows).toHaveLength(5);

  // Check if each row has the correct role and aria-label
  expect(screen.getByRole("grid", { name: "Game Board" })).toBeInTheDocument();

  // Check if each row has the correct aria-label
  rows.forEach((row, index) => {
    expect(row).toHaveAttribute("aria-label", `${index}`);
  });
});

test("renders 5 cells per row", () => {
  render(<Board />);
  const cells = screen.getAllByRole("cell");
  expect(cells).toHaveLength(25); // 5 rows * 5 cells per row

  // Check if each cell has the correct aria-label
  cells.forEach((cell, index) => {
    const x = index % 5;
    const y = Math.floor(index / 5);
    expect(cell).toHaveAttribute("aria-label", `${x}, ${y}`);
  });
});
