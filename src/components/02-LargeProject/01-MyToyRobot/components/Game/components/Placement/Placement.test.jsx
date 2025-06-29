import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Placement from "./Placement";

test("renders Placement component with correct position and type", () => {
  const position = { x: 2, y: 3 };
  const type = "block";
  render(<Placement x={position.x} y={position.y} type={type} style={{ zIndex: 10 }} axisOffset={false} />);

  const placementElement = screen.getByRole("gridcell", { name: `${type} at (${position.x}, ${position.y})` });
  expect(placementElement).toBeInTheDocument();
  expect(placementElement).toHaveStyle({
    left: "135px", // (2 * 60 + 15)px
    top: "195px"   // (3 * 60 + 15)px
  });
});

test("renders children inside Placement component", () => {
  const position = { x: 1, y: 1 };
  render(
    <Placement x={position.x} y={position.y} type="robot" style={{ zIndex: 10 }} axisOffset={false}>
      <span>🤖</span>
    </Placement>
  );

  const childElement = screen.getByText("🤖");
  expect(childElement).toBeInTheDocument();
});