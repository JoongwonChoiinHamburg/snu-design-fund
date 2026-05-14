"use client";

import { DonorBlock } from "@/lib/pattern";

type Props = {
  block: DonorBlock;
  cellSize: number;
  x: number;
  y: number;
  onClick: () => void;
  useVariablePatternSize: boolean;
  offsetX: number;
  offsetY: number;
  depth: number;
};

export default function PatternBlock({
  block,
  cellSize,
  x,
  y,
  onClick,
  useVariablePatternSize,
  offsetX,
  offsetY,
  depth,
}: Props) {
  const sizePx = block.size * cellSize;

  const patternTileSize = useVariablePatternSize
    ? getPatternTileSize(block.size)
    : 96;

  return (
    <button
      className="group absolute overflow-visible border border-black/10 transition-transform duration-300 ease-out hover:z-50 hover:border-black"
      style={{
        left: x,
        top: y,
        width: sizePx,
        height: sizePx,
        transform: `translate3d(${offsetX * depth}px, ${offsetY * depth}px, 0)`,
        backgroundImage: `url('/patterns/${block.patternKey}.svg')`,
        backgroundSize: `${patternTileSize}px ${patternTileSize}px`,
        backgroundRepeat: "repeat",
        backgroundPosition: "top left",
      }}
      onClick={onClick}
    >
      <div className="pointer-events-none absolute left-1/2 top-full z-[60] mt-2 hidden -translate-x-1/2 whitespace-nowrap border border-black bg-white px-3 py-2 text-left text-xs leading-tight text-black shadow-sm group-hover:block">
        <div className="font-semibold">{block.displayName}</div>
        <div>{block.amount.toLocaleString()}원</div>
      </div>
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