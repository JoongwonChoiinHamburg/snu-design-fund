"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import PatternBlock from "./PatternBlock";
import LayerPopup from "./LayerPopup";

import {
  DonorBlock,
  getZoom,
} from "@/lib/pattern";

type Props = {
  blocks: DonorBlock[];
};

const EMPTY_PATTERNS = [
  "mono1",
  "mono2",
  "mono3",
  "mono4",
];

const RANDOM_PATTERNS = [
  "red-01",
  "red-02",
  "red-03",
  "red-04",
  "blue-01",
  "blue-02",
  "blue-03",
  "blue-04",
  "pink-01",
  "pink-02",
  "pink-03",
  "pink-04",
  "yellow-01",
  "yellow-02",
  "yellow-03",
  "yellow-04",
];

type Mode = "overlap" | "stack" | "center";

type Density =
  | "compact"
  | "normal"
  | "spacious";



type PositionedBlock = {
  block: DonorBlock;
  x: number;
  y: number;
 renderSize?: number;
};

type EmptyPositionedBlock = {
  id: string;
  x: number;
  y: number;
  size: number;
   patternKey: string;
  depth: number;
  floatDelay: number;
};


  const DEFAULT_WALL_HEIGHT = 720;
const MOBILE_WALL_MIN_HEIGHT = 240;
const MOBILE_WALL_MAX_HEIGHT = 320;
const MOBILE_WALL_VIEWPORT_RATIO = 0.38;

export default function PatternWall({
  blocks,
}: Props) {



const EMPTY_BLOCK_COLORS = [
  "#ffffff",
  "#ededed",
  "#dddddd",
];

  const [showDevPanel, setShowDevPanel] = useState(false);
  const [mode, setMode] =
    useState<Mode>("overlap");
const [hoveredBlock, setHoveredBlock] =
  useState<DonorBlock | null>(null);
  const [density, setDensity] =
    useState<Density>("spacious");
const [useRandomPattern, setUseRandomPattern] = useState(true);
const [useVariablePatternSize, setUseVariablePatternSize] =
  useState(false);
  const [selectedBlock, setSelectedBlock] =
    useState<DonorBlock | null>(null);
    const [patternVersion, setPatternVersion] =
  useState("2");
const [patternSeed, setPatternSeed] = useState(0);
const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

const [layoutSeed, setLayoutSeed] = useState<number | null>(null);
const [tooltipPosition, setTooltipPosition] =
  useState({ x: 0, y: 0 });

  const containerRef =
    useRef<HTMLDivElement>(null);

  const [wallWidth, setWallWidth] =
    useState(1400);

    const [wallHeight, setWallHeight] =
    useState(DEFAULT_WALL_HEIGHT);

useEffect(() => {
  const seed = Date.now();

  setPatternSeed(seed);
  setLayoutSeed(seed);

  function updateWidth() {
    if (!containerRef.current) return;

    const nextWidth =
      containerRef.current.offsetWidth;

    setWallWidth(nextWidth);

    const nextHeight =
      nextWidth < 768
        ? Math.min(
            MOBILE_WALL_MAX_HEIGHT,
            Math.max(
              MOBILE_WALL_MIN_HEIGHT,
              window.innerHeight *
                MOBILE_WALL_VIEWPORT_RATIO
            )
          )
        : DEFAULT_WALL_HEIGHT;

    setWallHeight(Math.round(nextHeight));
  }

  updateWidth();

  window.addEventListener("resize", updateWidth);

  return () => {
    window.removeEventListener("resize", updateWidth);
  };
}, []);
  
useEffect(() => {
  function handleMouseMove(event: MouseEvent) {
    setTooltipPosition({
      x: event.clientX,
      y: event.clientY,
    });

    if (mode !== "overlap") return;

    const x = event.clientX / window.innerWidth - 0.5;
    const y = event.clientY / window.innerHeight - 0.5;

    setMouseOffset({
      x: x * 40,
      y: y * 40,
    });
  }

  window.addEventListener("mousemove", handleMouseMove);

  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
  };
}, [mode]);


const zoom = mode === "overlap" ? getZoom(blocks) : 1;

const cellSize =
  mode === "center"
    ? getTrueScaleCellSize(wallWidth, wallHeight)
    : getCellSize(wallWidth, density, zoom);


const patternScale = wallWidth / 1200;

  const totalAmount = blocks.reduce(
    (sum, block) => sum + block.amount,
    0
  );

  const goalAmount = 3_000_000_000;

  const progressPercent =
    (totalAmount / goalAmount) * 100;

const displayBlocks = useMemo(() => {
  if (!useRandomPattern) return blocks;

  return blocks.map((block, index) => {
    const seed =
  patternSeed +
  hashString(block.id) +
  index * 999;
    const patternIndex = Math.floor(
      seededRandom(seed) * RANDOM_PATTERNS.length
    );

    return {
      ...block,
      patternKey: RANDOM_PATTERNS[patternIndex],
    };
  });
}, [blocks, useRandomPattern, patternSeed]);


const positionedBlocks = useMemo(() => {
  if (mode === "overlap") {
    if (layoutSeed === null) return [];

    return createOverlapLayout(
      displayBlocks,
      wallWidth,
      wallHeight,
      cellSize,
      layoutSeed
    );
  }

  if (mode === "center") {
    return createCenterLayout(
      displayBlocks,
      wallWidth,
      wallHeight,
      cellSize
    );
  }

  return createStackLayout(
    displayBlocks,  
    wallWidth,
     wallHeight,
    cellSize
  );
}, [
  displayBlocks,
  mode,
  wallWidth,
  cellSize,
  layoutSeed,
   wallHeight
]);


const emptyBlocks = useMemo<EmptyPositionedBlock[]>(() => {
  if (blocks.length > 5 || layoutSeed === null) {
    return [];
  }

  // 2~4개 생성
  const emptyBlockCount =
    2 + Math.floor(seededRandom(layoutSeed + 5000) * 4);

  return Array.from(
    { length: emptyBlockCount },
    (_, index) => {
      const seed = layoutSeed + 10_000 + index * 7919;

      // 2~4칸 크기
      const gridSize =
        2 + Math.floor(seededRandom(seed + 1) * 3);

      const size = Math.min(
        gridSize * cellSize,
        wallWidth * 0.24,
        wallHeight * 0.45
      );

      const maxX = Math.max(0, wallWidth - size);
      const maxY = Math.max(0, wallHeight - size);

const patternIndex = Math.floor(
  seededRandom(seed + 2) * EMPTY_PATTERNS.length
);

return {
  id: `empty-block-${index}`,
  x: seededRandom(seed + 3) * maxX,
  y: seededRandom(seed + 4) * maxY,
  size,
  patternKey: EMPTY_PATTERNS[patternIndex],
  depth:
    0.25 + seededRandom(seed + 5) * 0.65,
  floatDelay:
    seededRandom(seed + 6) * -8,
};
    }
  );
}, [
  blocks.length,
  layoutSeed,
  wallWidth,
  wallHeight,
  cellSize,
]);
  return (
    <>
      <section className="relative left-1/2 w-screen bg-[var(--color-cream)] -translate-x-1/2 space-y-6">
        {/* controls */}
        <div className="mx-auto mb-3 flex max-w-[1800px] justify-end px-6">
  {/* <button
    type="button"
    onClick={() =>
      setShowDevPanel((prev) => !prev)
    }
    className="border border-[var(--color-grey)] px-2 py-1 text-[10px] uppercase tracking-wide text-[var(--color-grey)]/60 hover:bg-[var(--color-grey)] hover:text-white"
  >
    Dev
  </button> */}
</div>
{showDevPanel && (
  <div className="mx-auto flex max-w-[1800px] items-center justify-between px-6">
          <div className="flex gap-2">
            <button
              type="button"
              className={`rounded px-4 py-2 text-sm ${
                mode === "overlap"
                  ? "bg-[var(--color-grey)] text-white"
                  : "bg-gray-200 text-[var(--color-grey)]"
              }`}
              onClick={() =>
                setMode("overlap")
              }
            >
              겹치기
            </button>

            <button
              type="button"
              className={`rounded px-4 py-2 text-sm ${
                mode === "stack"
                  ? "bg-[var(--color-grey)] text-white"
                  : "bg-gray-200 text-[var(--color-grey)]"
              }`}
              onClick={() =>
                setMode("stack")
              }
            >
              쌓기
            </button>
            <button
  type="button"
  className={`rounded px-4 py-2 text-sm ${
    mode === "center"
      ? "bg-[var(--color-grey)] text-white"
      : "bg-gray-200 text-[var(--color-grey)]"
  }`}
  onClick={() => setMode("center")}
>
  중앙에 모으기
</button>
          </div>
<select
  value={patternVersion}
  onChange={(event) => setPatternVersion(event.target.value)}
  className="border border-[var(--color-grey)] bg-white px-3 py-2 text-xs text-[var(--color-grey)]"
>
  <option value="1">패턴 1</option>
  <option value="2">패턴 2</option>
  <option value="3">패턴 3</option>
</select>
          {/* density */}
      <div className="flex gap-2">
  {(["compact", "normal", "spacious"] as Density[]).map((item) => (
    <button
      key={item}
      type="button"
      className={`rounded px-3 py-2 text-xs capitalize ${
        density === item
          ? "bg-[var(--color-grey)] text-white"
          : "bg-gray-200 text-[var(--color-grey)]"
      }`}
      onClick={() => setDensity(item)}
    >
      {item}
    </button>
  ))}

  <button
    type="button"
    className={`rounded px-3 py-2 text-xs ${
      useRandomPattern
        ? "bg-[var(--color-grey)] text-white"
        : "bg-gray-200 text-[var(--color-grey)]"
    }`}
onClick={() => {
  setUseRandomPattern((prev) => !prev);

  const seed = Date.now();

  setPatternSeed(seed);
  setLayoutSeed(seed);
}}
  >
    패턴 랜덤
  </button>

<button
  type="button"
  className={`rounded px-3 py-2 text-xs ${
    useVariablePatternSize
      ? "bg-[var(--color-grey)] text-white"
      : "bg-gray-200 text-[var(--color-grey)]"
  }`}
  onClick={() => setUseVariablePatternSize((prev) => !prev)}
>
  패턴 크기 {useVariablePatternSize ? "변동" : "고정"}
</button>

</div>
        </div>
)}
        {/* wall */}
        <div
          ref={containerRef}
          className="mx-auto w-full max-w-[1800px] overflow-hidden "
         
        >
          <div
  className="relative"
  style={{
    width: wallWidth,
    height: wallHeight,
    backgroundImage:
      mode === "center"
        ? `
          linear-gradient(to right, rgba(0,0,0,0.12) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0,0,0,0.12) 1px, transparent 1px)
        `
        : "none",
    backgroundSize:
      mode === "center"
        ? `${cellSize}px ${cellSize}px`
        : undefined,
  }}
>


{emptyBlocks.map((emptyBlock) => (
  <EmptyPatternBlock
    key={emptyBlock.id}
    emptyBlock={emptyBlock}
    offsetX={mode === "overlap" ? mouseOffset.x : 0}
    offsetY={mode === "overlap" ? mouseOffset.y : 0}
    isFloating={mode === "overlap"}
  />
))}

{positionedBlocks.map(({ block, x, y, renderSize }) => (
  <PatternBlock
    key={block.id}
    block={block}
    renderSize={renderSize}
    cellSize={cellSize}
    x={x}
    y={y}
    onClick={() => setSelectedBlock(block)}
    onHover={setHoveredBlock}
    useVariablePatternSize={useVariablePatternSize}
    offsetX={mode === "overlap" ? mouseOffset.x : 0}
    offsetY={mode === "overlap" ? mouseOffset.y : 0}
    depth={getBlockDepth(block.size)}
    patternVersion={patternVersion}
    patternScale={patternScale}
    isFloating={mode === "overlap"}
  />
))}


       {positionedBlocks.map(({ block, x, y, renderSize }) => (
        
<PatternBlock
  key={block.id}
  block={block}
      renderSize={renderSize}
  cellSize={cellSize}
  x={x}
  y={y}
  onClick={() => setSelectedBlock(block)}
  onHover={setHoveredBlock}
  useVariablePatternSize={useVariablePatternSize}
  offsetX={mode === "overlap" ? mouseOffset.x : 0}
  offsetY={mode === "overlap" ? mouseOffset.y : 0}
  depth={getBlockDepth(block.size)}
  patternVersion={patternVersion}
  patternScale={patternScale}
  isFloating={mode === "overlap"}
/>
              )
            )}
          </div>
        </div>

     {/* progress */}
<div className="mx-auto mt-12 text-center">

 <section className="mx-auto pt-10 md:pt-30 bg-[var(--color-cream)]">

    <div className="mt-4 font-display text-xl mb-leading-none md:text-5xl">
       <span className="mr-5 text-xl md:text-3xl">
      모금액
    </span>
    {totalAmount.toLocaleString()}
    <span className="ml-5 text-xl md:text-3xl">
      원
    </span>
  </div>

 </section>

</div>
      </section>

{hoveredBlock &&
  typeof window !== "undefined" &&
  window.innerWidth >= 768 && (
    <div
      className="pointer-events-none fixed z-[9999] border-2 border-[var(--color-grey)] bg-white px-3 py-2 text-base leading-tight text-[var(--color-grey)] shadow-sm"
      style={{
        left: tooltipPosition.x + 14,
        top:
          tooltipPosition.y > window.innerHeight - 90
            ? tooltipPosition.y - 70
            : tooltipPosition.y + 14,
      }}
    >
      <div className="font-bold text-[var(--color-grey)]">
        {hoveredBlock.displayName} 동문
      </div>

      <div className=" text-[var(--color-grey)]" >
        {hoveredBlock.amount.toLocaleString()}원
      </div>
    </div>
  )}
      {/* popup */}
      <LayerPopup
        open={!!selectedBlock}
        onClose={() =>
          setSelectedBlock(null)
        }
         mobileMode="bottom"
      >
        {selectedBlock && (
          <div className="space-y-3 text-sm text-gray-900">
            <div className="mb-10">           
              <h3 className="text-lg font-bold ">
              {selectedBlock.displayName} 동문
            </h3>

            <p >
              {selectedBlock.amount.toLocaleString()}
              원
            </p>
      </div>
 
            {selectedBlock.message && (
              <span className="pattern-highlight-question text-2xl font-semibold">
                {selectedBlock.message}
              </span>
            )}

 
          </div>
        )}
      </LayerPopup>
    </>
  );
}
type EmptyPatternBlockProps = {
  emptyBlock: EmptyPositionedBlock;
  offsetX: number;
  offsetY: number;
  isFloating: boolean;
};

function EmptyPatternBlock({
  emptyBlock,
  offsetX,
  offsetY,
  isFloating,
}: EmptyPatternBlockProps) {
  const translateX = offsetX * emptyBlock.depth;
  const translateY = offsetY * emptyBlock.depth;

  return (
    <div
      className="
        pointer-events-auto
        absolute
        transition-transform
        duration-700
        ease-out
        will-change-transform
      "
      style={{
        left: emptyBlock.x,
        top: emptyBlock.y,
        width: emptyBlock.size,
        height: emptyBlock.size,
        transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
      }}
    >
      <div
        tabIndex={0}
        className={`
          group
          relative
          flex h-full w-full
          items-center justify-center
          overflow-hidden
          border border-[var(--color-grey)]/50
          transition-transform duration-300

          ${isFloating ? "empty-block-floating" : ""}
        `}
 style={{
  backgroundImage: `url(/patterns/mono/${emptyBlock.patternKey}.svg)`,
  backgroundRepeat: "repeat",
  backgroundPosition: "0 0",
  backgroundSize: "90px 90px",
  animationDelay: `${emptyBlock.floatDelay}s`,
}}
      >
        <div
          className="
            absolute inset-0
            flex items-center justify-center
            bg-[var(--color-grey)]/20
            px-3 text-center
            text-sm font-bold leading-snug text-[var(--color-grey)] 
            opacity-0
            transition-opacity duration-200
md:group-hover:opacity-100
md:group-focus:opacity-100
          "
        >
          후원을 기다립니다
        </div>
      </div>
    </div>
  );
}

function createCenterLayout(
  blocks: DonorBlock[],
  wallWidth: number,
  wallHeight: number,
  cellSize: number
): PositionedBlock[] {
  const sorted = [...blocks].sort((a, b) => b.area - a.area);
  const positioned: PositionedBlock[] = [];

  const gridCols = Math.floor(wallWidth / cellSize);
  const gridRows = Math.floor(wallHeight / cellSize);

  const occupied = Array.from({ length: gridRows }, () =>
    Array(gridCols).fill(false)
  );

  const centerX = Math.floor(gridCols / 2);
  const centerY = Math.floor(gridRows / 2);

  sorted.forEach((block, index) => {
    const size = getCenterSizeFromAmount(block.amount);
    
    console.log("CENTER SIZE", {
  name: block.displayName,
  amount: block.amount,
  calculatedSize: size,
  originalBlockSize: block.size,
});
    const seed = hashString(`${block.id}-${index}`);

    const candidates: { x: number; y: number; score: number }[] = [];

    for (let y = 0; y <= gridRows - size; y += 1) {
      for (let x = 0; x <= gridCols - size; x += 1) {
        if (!canPlace(occupied, x, y, size)) continue;

        const hasNeighbor =
          positioned.length === 0 || touchesOccupied(occupied, x, y, size);

        if (!hasNeighbor) continue;

        const blockCenterX = x + size / 2;
        const blockCenterY = y + size / 2;

        const distance =
          Math.pow(blockCenterX - centerX, 2) +
          Math.pow(blockCenterY - centerY, 2);

        const randomness = seededRandom(seed + x * 17 + y * 31) * 12;

        candidates.push({
          x,
          y,
          score: distance + randomness,
        });
      }
    }

    if (candidates.length === 0) return;

    candidates.sort((a, b) => a.score - b.score);

    const topCandidates = candidates.slice(0, Math.min(8, candidates.length));
    const selected =
      topCandidates[Math.floor(seededRandom(seed) * topCandidates.length)];

    markOccupied(occupied, selected.x, selected.y, size);

  positioned.push({
  block,
  x: selected.x * cellSize,
  y: selected.y * cellSize,
  renderSize: size,
});
  });

  return positioned;
}

function touchesOccupied(
  occupied: boolean[][],
  x: number,
  y: number,
  size: number
) {
  for (let row = y; row < y + size; row += 1) {
    if (occupied[row]?.[x - 1]) return true;
    if (occupied[row]?.[x + size]) return true;
  }

  for (let col = x; col < x + size; col += 1) {
    if (occupied[y - 1]?.[col]) return true;
    if (occupied[y + size]?.[col]) return true;
  }

  return false;
}

function findClosestEmptySquare(
  occupied: boolean[][],
  gridCols: number,
  gridRows: number,
  size: number,
  centerX: number,
  centerY: number
) {
  let best:
    | { x: number; y: number; distance: number }
    | null = null;

  for (let y = 0; y <= gridRows - size; y += 1) {
    for (let x = 0; x <= gridCols - size; x += 1) {
      if (!canPlace(occupied, x, y, size)) {
        continue;
      }

      const blockCenterX = x + size / 2;
      const blockCenterY = y + size / 2;

      const distance =
        Math.pow(blockCenterX - centerX, 2) +
        Math.pow(blockCenterY - centerY, 2);

      if (!best || distance < best.distance) {
        best = { x, y, distance };
      }
    }
  }

  return best;
}

function canPlace(
  occupied: boolean[][],
  x: number,
  y: number,
  size: number
) {
  for (let row = y; row < y + size; row += 1) {
    for (let col = x; col < x + size; col += 1) {
      if (occupied[row]?.[col]) {
        return false;
      }
    }
  }

  return true;
}

function markOccupied(
  occupied: boolean[][],
  x: number,
  y: number,
  size: number
) {
  for (let row = y; row < y + size; row += 1) {
    for (let col = x; col < x + size; col += 1) {
      occupied[row][col] = true;
    }
  }
}

function getCellSize(
  wallWidth: number,
  density: Density,
  zoom: number
) {
  let base = wallWidth / 48;

  if (density === "compact") {
    base *= 1.5;
  }

  if (density === "normal") {
    base *= 1;
  }

  if (density === "spacious") {
    base *= 0.55;
  }

  base *= zoom;

  return Math.max(24, Math.min(base, 160));
}

function getTrueScaleCellSize(
  wallWidth: number,
  wallHeight: number
) {
  const goalAmount = 3_000_000_000;
  const unitAmount = 1_000_000;
  const goalCells = goalAmount / unitAmount;

  const targetFillRatio = 0.8;
  const canvasArea = wallWidth * wallHeight;

  const cellSize = Math.sqrt(
    (canvasArea * targetFillRatio) / goalCells
  );

  return Math.max(12, Math.min(cellSize, 28));
}

function createOverlapLayout(
  blocks: DonorBlock[],
  wallWidth: number,
  wallHeight: number,
  cellSize: number,
  layoutSeed: number
): PositionedBlock[] {
  const sorted = [...blocks].sort(
    (a, b) => b.area - a.area
  );

  return sorted.map((block, index) => {
    const sizePx = block.size * cellSize;
    const seed = layoutSeed + hashString(block.id) + index * 1000;

    return {
      block,
      x:
        seededRandom(seed) *
        Math.max(0, wallWidth - sizePx),

      y:
        seededRandom(seed + 1000) *
        Math.max(0, wallHeight - sizePx),
    };
  });
}

function getBlockDepth(size: number) {
  switch (size) {
    case 1:
      return 1.2;
    case 2:
      return 0.9;
    case 3:
      return 0.65;
    case 4:
      return 0.45;
    case 6:
      return 0.25;
    case 8:
      return 0.12;
    default:
      return 0.5;
  }
}


function createStackLayout(
  blocks: DonorBlock[],
  wallWidth: number,
  wallHeight: number,
  cellSize: number
): PositionedBlock[] {
  const sorted = [...blocks].sort(
    (a, b) => b.area - a.area
  );

  const positioned: PositionedBlock[] =
    [];

  let cursorX = 0;
  let cursorY = wallHeight;

  sorted.forEach((block) => {
    const sizePx =
      block.size * cellSize;

    if (
      cursorX + sizePx >
      wallWidth
    ) {
      cursorX = 0;
      cursorY -= sizePx;
    }

    positioned.push({
      block,
      x: cursorX,
      y: cursorY - sizePx,
    });

    cursorX += sizePx;
  });

  return positioned;
}

function hashString(value: string) {
  let hash = 0;

  for (
    let i = 0;
    i < value.length;
    i += 1
  ) {
    hash =
      (hash << 5) -
      hash +
      value.charCodeAt(i);

    hash |= 0;
  }

  return Math.abs(hash);
}

function getCenterSizeFromAmount(amount: number) {
  // 중앙 모으기 전용: 100만원 = 1칸 기준
  const unitAmount = 1_000_000;
  const area = amount / unitAmount;

  // 정사각형 한 변 칸 수
  const size = Math.round(Math.sqrt(area));

  return Math.max(1, Math.min(size, 18));
}

function seededRandom(seed: number) {
  const x =
    Math.sin(seed) * 10000;

  return x - Math.floor(x);
}