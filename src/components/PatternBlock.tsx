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
  patternScale: number;
  renderSize?: number;
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
  patternScale,
  renderSize,
}: Props) {
  const effectiveSize = renderSize ?? block.size;
const sizePx = effectiveSize * cellSize;
const [isHovered, setIsHovered] = useState(false);


const basePatternTileSize = useVariablePatternSize
  ? getPatternTileSize(block.size)
  : 96;

const randomDensityScale = useVariablePatternSize
  ? getRandomDensityScale(block.id)
  : 1;

const patternTileSize =
  basePatternTileSize *
  randomDensityScale *
  patternScale;


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
    backgroundPosition: "-1px -1px",
  }}
      />
    </button>
  );
}

function getRandomDensityScale(id: string) {
  const value = seededRandom(hashString(id));

  // 대부분은 정상 범위
  if (value < 0.7) {
    return 0.85 + value * 0.45; // 약 0.85 ~ 1.16
  }

  // 가끔 아주 빽빽함
  if (value < 0.85) {
    return 0.45;
  }

  // 가끔 아주 느슨함
  return 1.8;
}

function hashString(value: string) {
  let hash = 0;

  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }

  return Math.abs(hash);
}

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
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