import React from "react";

/**
 * 通用放置组件，可用于放置机器人、方块或其他元素
 * @param {Object} props
 * @param {number} props.x - 横坐标（格）
 * @param {number} props.y - 纵坐标（格）
 * @param {string} [props.type] - 类型（如 'robot', 'block', ...）
 * @param {React.ReactNode} [props.children] - 放置的内容
 * @param {Object} [props.style] - 额外样式
 * @param {string} [props.className] - 额外class
 * @param {boolean} [props.axisOffset] - 是否包含轴标签偏移（默认true）
 * @param {boolean} [props.alignToGrid] - 是否对齐格线交点（默认true）
 */
const Placement = ({ x, y, type = '', children, style = {}, className = "", axisOffset = true, alignToGrid = true }) => {
  // alignToGrid: true 表示居中在格子内，false表示对齐格线交点
  let left, top;
  if (alignToGrid) {
    left = x * 60 + (axisOffset ? 32 : 0) + 15;
    top = y * 60 + (axisOffset ? 32 : 0) + 15;
  } else {
    // 让元素中心对齐交点（即加上半个元素宽高的偏移）
    left = x * 60 + (axisOffset ? 32 : 0) - 16;
    top = y * 60 + (axisOffset ? 32 : 0) - 16;
  }
  return (
    <div
      role='gridcell'
      aria-label={`${type} at (${x}, ${y})`}
      style={{
        left: `${left}px`,
        top: `${top}px`,
        zIndex: 10,
        ...style,
      }}
      className={`absolute transition-all duration-300 ease-in-out ${className} placement-${type}`}
    >
      {children}
    </div>
  );
};

export default Placement;
