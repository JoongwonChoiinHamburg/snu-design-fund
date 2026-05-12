"use client";

import { DonorBlock } from "@/lib/pattern";

type Props = {
  block: DonorBlock;
  cellSize: number;
  x: number;
  y: number;
  onClick: () => void;
};

export default function PatternBlock({
  block,
  cellSize,
  x,
  y,
  onClick,
}: Props) {
  const sizePx = block.size * cellSize;

  return (
    <button
      className="absolute overflow-hidden border border-black/10 transition hover:brightness-95"
      style={{
        left: x,
        top: y,
        width: sizePx,
        height: sizePx,
        backgroundImage: `url('/patterns/${block.patternKey}.svg')`,
        backgroundSize: "96px 96px",
backgroundRepeat: "repeat",
backgroundPosition: "top left",
      }}
      onClick={onClick}
      title={`${block.displayName} / ${block.amount.toLocaleString()}원`}
    />
  );
}