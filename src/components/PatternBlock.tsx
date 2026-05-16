"use client";

import { DonorBlock } from "@/lib/pattern";
import { useState } from "react";


type Props = {
  block: DonorBlock;
  cellSize: number;
  x: number;
  y: number;
  onClick: () => void;
  onHover: (block: DonorBlock | null) => void;
  useVariablePatternSize: boolean;
  offsetX: number;
  offsetY: number;
  depth: number;
  patternVersion: string;
};

export default function PatternBlock({
  block,
  cellSize,
  x,
  y,
  onClick,
  onHover,
  useVariablePatternSize,
  offsetX,
  offsetY,
  depth,patternVersion,
}: Props) {
  const sizePx = block.size * cellSize;
const [isHovered, setIsHovered] = useState(false);
  const patternTileSize = useVariablePatternSize
    ? getPatternTileSize(block.size)
    : 96;

  return (
    <button
      className="group absolute overflow-visible"
      style={{
        left: x,
        top: y,
        width: sizePx,
        height: sizePx,
        transform: `translate3d(${offsetX * depth}px, ${offsetY * depth}px, 0)`,
      }}
      onClick={onClick}
      onMouseEnter={() => {
  setIsHovered(true);
  onHover(block);
}}
onMouseLeave={() => {
  setIsHovered(false);
  onHover(null);
}}
    >
     <div
  className="absolute inset-0 border border-black/10 transition-all duration-150"
  style={{
    outline: isHovered ? "3px solid black" : "none",
    outlineOffset: "-1px",
  backgroundImage: `url('/patterns/${patternVersion}/${block.patternKey}.svg')`,
    backgroundSize: `${patternTileSize}px ${patternTileSize}px`,
    backgroundRepeat: "repeat",
    backgroundPosition: "top left",
  }}
      />
    </button>
  );
}

function getPatternTileSize(size: number) {
  switch (size) {
    case 1:
      return 96;
    case 2:
      return 128;
    case 3:
      return 160;
    case 4:
      return 220;
    case 6:
      return 320;
    case 8:
      return 480;
    default:
      return 96;
  }
}