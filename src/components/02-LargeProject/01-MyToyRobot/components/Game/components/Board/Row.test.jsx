import { render, screen } from "@testing-library/react";
import Row from "./Row"; // Adjust the import path as necessary

test('renders row with  name x', () => {
  const y = 2; // Example y value
  render(<Row y={y} />);
  
  // Check if the row is rendered with the correct role and aria-label
  const rowElement = screen.getByRole('row', { name: `${y}` });
  expect(rowElement).toBeInTheDocument();
});

test('renders 5 cells per row', () => {
  const y = 3; // Example y value
  render(<Row y={y} />);
  
  // Check if the row contains exactly 5 cells
  const cells = screen.getAllByRole('cell');
  expect(cells).toHaveLength(5);
  
  // Check if each cell has the correct x and y coordinates
  cells.forEach((cell, index) => {
    expect(cell).toHaveAttribute('aria-label', `${index}, ${y}`);
  });
});

