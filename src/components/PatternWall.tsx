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

type Mode = "overlap" | "stack";

type Density =
  | "compact"
  | "normal"
  | "spacious";



type PositionedBlock = {
  block: DonorBlock;
  x: number;
  y: number;

};

const WALL_HEIGHT = 720;

export default function PatternWall({
  blocks,
}: Props) {
  const [mode, setMode] =
    useState<Mode>("overlap");
const [hoveredBlock, setHoveredBlock] =
  useState<DonorBlock | null>(null);
  const [density, setDensity] =
    useState<Density>("normal");
const [useRandomPattern, setUseRandomPattern] = useState(false);
const [useVariablePatternSize, setUseVariablePatternSize] =
  useState(true);
  const [selectedBlock, setSelectedBlock] =
    useState<DonorBlock | null>(null);
    const [patternVersion, setPatternVersion] =
  useState("1");
const [patternSeed, setPatternSeed] = useState(0);
const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

const [layoutSeed, setLayoutSeed] = useState<number | null>(null);
const [tooltipPosition, setTooltipPosition] =
  useState({ x: 0, y: 0 });

  const containerRef =
    useRef<HTMLDivElement>(null);

  const [wallWidth, setWallWidth] =
    useState(1400);

  useEffect(() => {
      setLayoutSeed(Date.now());
    function updateWidth() {
      if (!containerRef.current) return;

      setWallWidth(
        containerRef.current.offsetWidth
      );
    }

    updateWidth();

    window.addEventListener(
      "resize",
      updateWidth
    );

    return () => {
      window.removeEventListener(
        "resize",
        updateWidth
      );
    };
  }, []);
useEffect(() => {
  function handleMouseMove(event: MouseEvent) {
    if (mode !== "overlap") return;

    const x =
      event.clientX / window.innerWidth - 0.5;

    const y =
      event.clientY / window.innerHeight - 0.5;

    setMouseOffset({
      x: x * 40,
      y: y * 40,
    });

    setTooltipPosition({
      x: event.clientX,
      y: event.clientY,
    });
  }

  window.addEventListener(
    "mousemove",
    handleMouseMove
  );

  return () => {
    window.removeEventListener(
      "mousemove",
      handleMouseMove
    );
  };
}, [mode]);
  const zoom =
    mode === "overlap"
      ? getZoom(blocks)
      : 1;

  const cellSize = getCellSize(
    wallWidth,
    density,
    zoom
  );

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
  cellSize,
  layoutSeed
    );
  }

  return createStackLayout(
    displayBlocks,
    wallWidth,
    cellSize
  );
}, [
  displayBlocks,
  mode,
  wallWidth,
  cellSize,
  layoutSeed,
]);

  return (
    <>
      <section className="relative left-1/2 w-screen -translate-x-1/2 space-y-6">
        {/* controls */}
        <div className="mx-auto flex max-w-[1800px] items-center justify-between px-6">
          <div className="flex gap-2">
            <button
              type="button"
              className={`rounded px-4 py-2 text-sm ${
                mode === "overlap"
                  ? "bg-black text-white"
                  : "bg-gray-200 text-black"
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
                  ? "bg-black text-white"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() =>
                setMode("stack")
              }
            >
              쌓기
            </button>
          </div>
<select
  value={patternVersion}
  onChange={(event) => setPatternVersion(event.target.value)}
  className="border border-black bg-white px-3 py-2 text-xs text-black"
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
          ? "bg-black text-white"
          : "bg-gray-200 text-black"
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
        ? "bg-black text-white"
        : "bg-gray-200 text-black"
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
      ? "bg-black text-white"
      : "bg-gray-200 text-black"
  }`}
  onClick={() => setUseVariablePatternSize((prev) => !prev)}
>
  패턴 크기 {useVariablePatternSize ? "변동" : "고정"}
</button>

</div>
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
              height: WALL_HEIGHT,
            }}
          >
            {positionedBlocks.map(
              ({ block, x, y }) => (
<PatternBlock
  key={block.id}
  block={block}
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
/>
              )
            )}
          </div>
        </div>

        {/* progress */}
        <div className="mx-auto flex max-w-[1800px] items-baseline justify-between px-6 text-sm text-gray-900">
          <p>
            현재{" "}
            <strong className="text-lg">
              {totalAmount.toLocaleString()}
              원
            </strong>
            이 모였습니다.
          </p>

          <p>
            목표 3,000,000,000원 대비{" "}
            <strong>
              {progressPercent.toFixed(1)}%
            </strong>
          </p>
        </div>
      </section>

{hoveredBlock && (
  <div
    className="pointer-events-none fixed z-[9999] border border-black bg-white px-3 py-2 text-xs leading-tight text-black shadow-sm"
    style={{
      left: tooltipPosition.x + 14,
      top:
        tooltipPosition.y > window.innerHeight - 90
          ? tooltipPosition.y - 70
          : tooltipPosition.y + 14,
    }}
  >
    <div className="font-semibold">
      {hoveredBlock.displayName}
    </div>
    <div>
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
      >
        {selectedBlock && (
          <div className="space-y-3 text-sm text-gray-900">
            <h3 className="text-lg font-bold">
              {selectedBlock.displayName}
            </h3>

            <p>
              {selectedBlock.amount.toLocaleString()}
              원
            </p>

            {selectedBlock.message && (
              <p>
                {selectedBlock.message}
              </p>
            )}

            <button
              type="button"
              className="mt-4 w-full rounded bg-black px-4 py-2 text-sm text-white"
              onClick={() =>
                setSelectedBlock(null)
              }
            >
              닫기
            </button>
          </div>
        )}
      </LayerPopup>
    </>
  );
}

function getCellSize(
  wallWidth: number,
  density: Density,
  zoom: number
) {
  let base = wallWidth / 28;

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

function createOverlapLayout(
  blocks: DonorBlock[],
  wallWidth: number,
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
        Math.max(0, WALL_HEIGHT - sizePx),
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
  cellSize: number
): PositionedBlock[] {
  const sorted = [...blocks].sort(
    (a, b) => b.area - a.area
  );

  const positioned: PositionedBlock[] =
    [];

  let cursorX = 0;
  let cursorY = WALL_HEIGHT;

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

function seededRandom(seed: number) {
  const x =
    Math.sin(seed) * 10000;

  return x - Math.floor(x);
}