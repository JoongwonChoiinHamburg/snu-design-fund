"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import PatternBlock from "./PatternBlock";
import LayerPopup from "./LayerPopup";

import {
  DonorBlock,
  getZoom,
} from "@/lib/pattern";

type Props = {
  blocks: DonorBlock[];
  onPopupOpenChange?: (open: boolean) => void;
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
const MOBILE_WALL_MIN_HEIGHT = 480;
const MOBILE_WALL_MAX_HEIGHT = 780;
const MOBILE_WALL_VIEWPORT_RATIO = 0.62;

export default function PatternWall({
  blocks,
  onPopupOpenChange,
}: Props) {



const EMPTY_BLOCK_COLORS = [
  "#ffffff",
  "#ededed",
  "#dddddd",
];
const [hoveredEmptyBlock, setHoveredEmptyBlock] =
  useState<EmptyPositionedBlock | null>(null);
  

  
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

  useEffect(() => {
  onPopupOpenChange?.(!!selectedBlock);
}, [selectedBlock, onPopupOpenChange]);
const [patternSeed, setPatternSeed] = useState(0);
const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

const [layoutSeed, setLayoutSeed] = useState<number | null>(null);
const [tooltipPosition, setTooltipPosition] =
  useState({ x: 0, y: 0 });

const [isMounted, setIsMounted] = useState(false);
useEffect(() => {
  setIsMounted(true);
}, []);
  
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
      <section className="relative left-1/2 w-screen -translate-x-1/2 space-y-6">
        {/* controls */}
        <div className="mx-auto mb-3 flex max-w-[1800px] justify-end px-6">

</div>

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
    onHover={(block, event) => {
      setHoveredEmptyBlock(block);

      if (event) {
        setTooltipPosition({
          x: event.clientX,
          y: event.clientY,
        });
      }
    }}
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



          </div>
        </div>


      </section>

{isMounted &&
  createPortal(
    <>
   {hoveredBlock &&
  window.innerWidth >= 768 && (
    <div
      className="pointer-events-none fixed z-[9999] border-2 border-[var(--color-grey)] bg-white px-3 py-2 text-base leading-tight text-[var(--color-grey)] shadow-sm"
      style={{
        left: tooltipPosition.x + 14,
        top:
          tooltipPosition.y >
          window.innerHeight - 110
            ? tooltipPosition.y - 90
            : tooltipPosition.y + 14,
      }}
    >
      <div className="font-bold text-[var(--color-grey)]">
        {hoveredBlock.displayName} 님
      </div>

      {hoveredBlock.position && (
        <div className="mt-1 text-sm text-[var(--color-grey)]/75">
          {hoveredBlock.position}
        </div>
      )}

      <div className="mt-1 text-[var(--color-grey)]">
        {hoveredBlock.amount.toLocaleString()}원
      </div>
    </div>
  )}

      {hoveredEmptyBlock && (
        <div
          className="
            pointer-events-none
            fixed z-[9999]
            hidden
            border-1 border-gray-400
            bg-white
            px-3 py-2
            text-semibold
            text-large leading-tight text-[var(--color-grey)]
            shadow-sm
            md:block
          "
          style={{
            left: tooltipPosition.x + 14,
            top:
              tooltipPosition.y >
              window.innerHeight - 90
                ? tooltipPosition.y - 70
                : tooltipPosition.y + 14,
          }}
        >
          <div className="font-lg">
            소중한 후원을 기다립니다
          </div>
        </div>
      )}
    </>,
    document.body
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
  <div className="space-y-3 text-center text-sm text-[var(--color-grey)]">
    <div className="mb-10 text-center">
      <h3 className="text-lg font-bold">
        {selectedBlock.displayName} 님
      </h3>

    {selectedBlock.position && (
    <p className="mt-1 text-sm text-[var(--color-grey)]/75">
      {selectedBlock.position}
    </p>
  )}
      <p>
        {selectedBlock.amount.toLocaleString()}
        원
      </p>
    </div>

    {selectedBlock.message && (
      <span
        className="inline-block text-xl font-bold leading-relaxed md:text-3xl"
        style={{
          backgroundImage: `url('/patterns/${patternVersion}/${selectedBlock.patternKey}.svg')`,
          backgroundSize: "48px 48px",
          backgroundRepeat: "repeat",
          backgroundPosition: "0 0",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          WebkitTextFillColor: "transparent",
          textShadow: "0 0 1px rgba(0,0,0,0.15)",
        }}
      >
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
  onHover: (
    block: EmptyPositionedBlock | null,
    event?: React.MouseEvent<HTMLDivElement>
  ) => void;
};

function EmptyPatternBlock({
  emptyBlock,
  offsetX,
  offsetY,
  isFloating,
  onHover,
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
  onMouseEnter={(event) => onHover(emptyBlock, event)}
  onMouseMove={(event) => onHover(emptyBlock, event)}
  onMouseLeave={() => onHover(null)}
  className="
    group
    empty-pattern-drift
    relative
    flex h-full w-full
    items-center justify-center
    overflow-hidden
    border-2 border-transparent
    transition-all duration-200
    hover:z-50
    hover:scale-105
    hover:border-gray-400
    focus:z-50
    focus:scale-105
    focus:border-gray-400
  "
  style={{
    backgroundImage: `url(/patterns/mono/${emptyBlock.patternKey}.svg)`,
    backgroundRepeat: "repeat",
    backgroundPosition: "0 0",
    backgroundSize: "90px 90px",
  }}
>

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

const PATTERN_TEXT_COLORS: Record<string, string> = {
  red1: "white",
  red2: "white",
  red3: "var(--color-grey)",
  red4: "white",

  blue1: "white",
  blue2: "white",
  blue3: "var(--color-grey)",
  blue4: "white",

  pink1: "var(--color-grey)",
  pink2: "var(--color-grey)",
  pink3: "white",
  pink4: "var(--color-grey)",

  yellow1: "var(--color-grey)",
  yellow2: "var(--color-grey)",
  yellow3: "white",
  yellow4: "var(--color-grey)",
};

function getTextColorForPattern(patternKey: string) {
  return (
    PATTERN_TEXT_COLORS[patternKey] ??
    "var(--color-grey)"
  );
}