"use client";

import { DonorBlock } from "@/lib/pattern";

type Props = {
  block: DonorBlock;
  cellSize: number;
  x: number;
  y: number;
  onClick: () => void;
  useVariablePatternSize: boolean;
};

export default function PatternBlock({
  block,
  cellSize,
  x,
  y,
  onClick,  useVariablePatternSize,
}: Props) {
  const sizePx = block.size * cellSize;

const patternTileSize = useVariablePatternSize
  ? getPatternTileSize(block.size)
  : 96;
  return (
    <button
      className="absolute overflow-hidden border border-black/10 transition hover:brightness-95"
      style={{
        left: x,
        top: y,
        width: sizePx,
        height: sizePx,
        backgroundImage: `url('/patterns/${block.patternKey}.svg')`,
        backgroundSize: `${patternTileSize}px ${patternTileSize}px`,
        backgroundRepeat: "repeat",
        backgroundPosition: "top left",
      }}
      onClick={onClick}
      title={`${block.displayName} / ${block.amount.toLocaleString()}원`}
    />
  );
}

function getPatternTileSize(size: number) {
  switch (size) {
    case 1:
      return 48;
    case 2:
      return 96;
    case 3:
      return 128;
    case 4:
      return 160;
    case 6:
      return 220;
    case 8:
      return 480;
    default:
      return 96;
  }
}