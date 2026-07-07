"use client";

import { DonorBlock } from "@/lib/pattern";
import { useEffect, useState } from "react";

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
  isFloating: boolean;
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
  isFloating,
}: Props) {
  const effectiveSize = renderSize ?? block.size;
const sizePx = Math.ceil(effectiveSize * cellSize);
const [isHovered, setIsHovered] = useState(false);
const [time, setTime] = useState(0);


const basePatternTileSize = useVariablePatternSize
  ? getPatternTileSize(block.size)
  : 96;

const randomDensityScale = useVariablePatternSize
  ? getRandomDensityScale(block.id)
  : 1;

const patternTileSize = Math.round(
  basePatternTileSize *
    randomDensityScale *
    patternScale
);

useEffect(() => {
  let frame: number;

  function animate() {
    setTime(performance.now() * 0.001);
    frame = requestAnimationFrame(animate);
  }

  frame = requestAnimationFrame(animate);

  return () => cancelAnimationFrame(frame);
}, []);

const floating = isFloating
  ? getFloatingOffset(block.id, time)
  : { x: 0, y: 0 };

const safeX = Math.floor(x);
const safeY = Math.floor(y);

const translateX = Math.round(
  offsetX * depth + floating.x
);

const translateY = Math.round(
  offsetY * depth + floating.y
);


const nameLabelFontSize = Math.max(
  7,
  Math.min(cellSize * 0.45, 14)
);

const nameLabelHeight = Math.min(
  sizePx,
  Math.max(
    nameLabelFontSize + 10,
    cellSize * 0.5
  )
);

const nameLabelMaxWidth = Math.max(
  nameLabelHeight,
  sizePx - 2
);

const sizeLayer =
  Math.max(0, 20 - effectiveSize) * 10000;

const hoverLayer = isHovered ? 100 : 0;

const blockZIndex =
  sizeLayer +
  Math.round(depth * 10) +
  hoverLayer;

return (
  <button
    className="group absolute overflow-visible border-0 p-0"
    style={
      {
        left: safeX,
        top: safeY,
        width: sizePx,
        height: sizePx,
        transform: `translate(${translateX}px, ${translateY}px)`,
        zIndex: blockZIndex,
      } as React.CSSProperties
    }
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
    {/* pattern */}
{/* pattern */}
<div className="absolute inset-0 z-0 overflow-hidden border border-black/10">
  <div
    className="absolute -inset-[2px]"
    style={{
      backgroundImage: `url('/patterns/${patternVersion}/${block.patternKey}.svg')`,
      backgroundSize: `${patternTileSize + 4}px ${patternTileSize + 4}px`,
      backgroundRepeat: "repeat",
      backgroundPosition: "-2px -2px",
    }}
  />
</div>

    {/* name label */}
<div
  className="
    pointer-events-none
    absolute
    right-[-1px]
    top-[-1px]
    z-10
    flex
    w-fit
    items-center
    justify-center
    bg-white
    px-2
    text-center
    font-semibold
    leading-[1.15]
    text-[var(--color-grey)]
  "
  style={{
    height: nameLabelHeight,
    maxWidth: nameLabelMaxWidth,
    fontSize: nameLabelFontSize,
  }}
>
  <span className="block max-w-full truncate whitespace-nowrap">
    {block.displayName}
  </span>
</div>

{/* hover outline */}
<div
  className="
    pointer-events-none
    absolute
    z-20
    transition-all
    duration-150
  "
  style={{
    inset: -3,
    border: isHovered
      ? "3px solid black"
      : "3px solid transparent",
  }}
/>
  </button>
);
}

function getFloatValue(id: string, salt: number) {
  const value = seededRandom(hashString(`${id}-${salt}`));

  // -8px ~ 8px
  return Math.round((value - 0.5) * 16);
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

function getFloatingOffset(
  id: string,
  time: number
) {
  const seed = hashString(id);

  const speed1 =
    0.25 + seededRandom(seed) * 0.35;

  const speed2 =
    0.12 + seededRandom(seed + 1) * 0.28;

  const ampX =
    2 + seededRandom(seed + 2) * 10;

  const ampY =
    2 + seededRandom(seed + 3) * 10;

  const phase1 =
    seededRandom(seed + 4) * Math.PI * 2;

  const phase2 =
    seededRandom(seed + 5) * Math.PI * 2;

  return {
    x:
      Math.sin(time * speed1 + phase1) *
      ampX,

    y:
      Math.cos(time * speed2 + phase2) *
      ampY,
  };
}