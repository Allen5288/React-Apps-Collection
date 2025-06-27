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
 */
const Placement = ({ x, y, type = '', children, style = {}, className = "", axisOffset = true }) => {
  // 32px 轴标签偏移 + 12px 居中，或仅 12px 居中
  const left = x * 60 + (axisOffset ? 32 : 0) + 15;
  const top = y * 60 + (axisOffset ? 32 : 0) + 15;
  return (
    <div
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
