import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Block from "./Block";

test("renders Block component with correct position", () => {
  const position = { x: 2, y: 3 };
  render(<Block position={position} />);
  
    const blockElement = screen.getByLabelText("block");
    expect(blockElement).toBeInTheDocument();
    expect(blockElement).toHaveTextContent("🧱");
});
