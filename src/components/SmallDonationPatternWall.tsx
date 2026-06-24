"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type Props = {
  sheetCsvUrl?: string;
};

type SmallDonationItem = {
  id: string;
  displayName: string;
  amount: number;
  isVisible: boolean;
  patternKey?: string;
};

type PositionedSmallDonationItem = {
  item: SmallDonationItem;
  x: number;
  y: number;
  depth: number;
  floatDelay: number;
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

const DEFAULT_WALL_HEIGHT = 720;
const MOBILE_WALL_MIN_HEIGHT = 270;
const MOBILE_WALL_MAX_HEIGHT = 550;
const MOBILE_WALL_VIEWPORT_RATIO = 0.42;

export default function SmallDonationPatternWall({
  sheetCsvUrl = process.env
    .NEXT_PUBLIC_SMALL_DONATION_SHEET_CSV_URL ?? "",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [items, setItems] = useState<SmallDonationItem[]>([]);
  const [wallWidth, setWallWidth] = useState(1400);
  const [wallHeight, setWallHeight] =
    useState(DEFAULT_WALL_HEIGHT);

  const [layoutSeed, setLayoutSeed] =
    useState<number | null>(null);

  const [patternSeed, setPatternSeed] = useState(0);

  const [mouseOffset, setMouseOffset] =
    useState({ x: 0, y: 0 });

const [time, setTime] = useState(0);

  const [hoveredId, setHoveredId] =
    useState<string | null>(null);

  useEffect(() => {
    const seed = Date.now();

    setPatternSeed(seed);
    setLayoutSeed(seed);

    function updateSize() {
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

    updateSize();

    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

useEffect(() => {
  let frame: number;

  function animate() {
    setTime(performance.now() * 0.001);
    frame = requestAnimationFrame(animate);
  }

  frame = requestAnimationFrame(animate);

  return () => cancelAnimationFrame(frame);
}, []);

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      const x =
        event.clientX / window.innerWidth - 0.5;
      const y =
        event.clientY / window.innerHeight - 0.5;

      setMouseOffset({
        x: x * 40,
        y: y * 40,
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
  }, []);

  useEffect(() => {
    if (!sheetCsvUrl) return;

    async function fetchSmallDonations() {
      try {
        const url =
          sheetCsvUrl +
          (sheetCsvUrl.includes("?") ? "&" : "?") +
          `v=${Date.now()}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(
            "소액기부자 스프레드시트를 불러오지 못했습니다."
          );
        }

        const csvText = await response.text();

        setItems(parseSmallDonationCsv(csvText));
      } catch (error) {
        console.error(error);
        setItems([]);
      }
    }

    fetchSmallDonations();
  }, [sheetCsvUrl]);

  const cellSize = getSmallDonationCellSize(wallWidth);
  const patternScale = wallWidth / 1200;

  const displayItems = useMemo(() => {
    return items.map((item, index) => {
      const seed =
        patternSeed +
        hashString(item.id) +
        index * 999;

      const patternIndex = Math.floor(
        seededRandom(seed) * RANDOM_PATTERNS.length
      );

      return {
        ...item,
        patternKey: RANDOM_PATTERNS[patternIndex],
      };
    });
  }, [items, patternSeed]);

  const positionedItems =
    useMemo<PositionedSmallDonationItem[]>(() => {
      if (layoutSeed === null) return [];

      return createSmallDonationOverlapLayout(
        displayItems,
        wallWidth,
        wallHeight,
        cellSize,
        layoutSeed
      );
    }, [
      displayItems,
      wallWidth,
      wallHeight,
      cellSize,
      layoutSeed,
    ]);

  return (
    <section className="relative left-1/2 w-screen -translate-x-1/2 bg-[var(--color-cream)]">
      <div
        ref={containerRef}
        className="mx-auto w-full max-w-[1800px] overflow-hidden"
      >
        <div
          className="relative"
          style={{
            width: wallWidth,
            height: wallHeight,
          }}
        >
          {positionedItems.map(
            ({ item, x, y, depth, floatDelay }) => (
              <SmallDonationBlock
                key={item.id}
                item={item}
                x={x}
                y={y}
                cellSize={cellSize}
                depth={depth}
                floatDelay={floatDelay}
                offsetX={mouseOffset.x}
                offsetY={mouseOffset.y}
                patternScale={patternScale}
                isHovered={hoveredId === item.id}
                onHover={setHoveredId}
                time={time}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
}

type SmallDonationBlockProps = {
  item: SmallDonationItem;
  x: number;
  y: number;
  cellSize: number;
  depth: number;
  floatDelay: number;
  offsetX: number;
  offsetY: number;
  patternScale: number;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  time: number;
};

function SmallDonationBlock({
  item,
  x,
  y,
  cellSize,
  depth,
  floatDelay,
  offsetX,
  offsetY,
  patternScale,
  isHovered,
  onHover,
    time,
}: SmallDonationBlockProps) {
const floating = getFloatingOffset(
  item.id,
  time
);

const translateX =
  offsetX * depth + floating.x;

const translateY =
  offsetY * depth + floating.y;

  const itemWidth = cellSize * 3;
  const itemHeight = cellSize;

  const patternSize = Math.max(
    48,
    90 * patternScale
  );

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
        left: x,
        top: y,
        width: itemWidth,
        height: itemHeight,
        transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
        zIndex: isHovered ? 50 : Math.round(depth * 10),
      }}
    >
      <div
        tabIndex={0}
        onMouseEnter={() => onHover(item.id)}
        onMouseLeave={() => onHover(null)}
        onFocus={() => onHover(item.id)}
        onBlur={() => onHover(null)}
        className="
          flex
          h-full
          w-full
          overflow-hidden

          bg-white
          transition-all
          duration-200
          hover:scale-105
          hover:shadow-[0_0_0_2px_#000]

        "
        style={{
          animationDelay: `${floatDelay}s`,
        }}
      >
        <div
          className="h-full shrink-0"
          style={{
            width: cellSize,
            backgroundImage: `url(/patterns/2/${item.patternKey}.svg)`,
            backgroundRepeat: "repeat",
            backgroundPosition: "0 0",
            backgroundSize: `${patternSize}px ${patternSize}px`,
          }}
        />

        <div
          className="
            flex
            h-full
            items-center
            justify-center

            px-2
            text-center
            font-semibold
            leading-none
            text-[var(--color-grey)]
          "
          style={{
            width: cellSize * 2,
            fontSize: Math.max(
              11,
              Math.min(cellSize * 0.34, 18)
            ),
          }}
        >
          <span className="block w-full truncate">
            {item.displayName}
          </span>
        </div>
      </div>
    </div>
  );
}

function createSmallDonationOverlapLayout(
  items: SmallDonationItem[],
  wallWidth: number,
  wallHeight: number,
  cellSize: number,
  layoutSeed: number
): PositionedSmallDonationItem[] {
  const itemWidth = cellSize * 3;
  const itemHeight = cellSize;

  return items.map((item, index) => {
    const seed =
      layoutSeed +
      hashString(item.id) +
      index * 1000;

    return {
      item,
      x:
        seededRandom(seed) *
        Math.max(0, wallWidth - itemWidth),

      y:
        seededRandom(seed + 1000) *
        Math.max(0, wallHeight - itemHeight),

      depth:
        0.25 +
        seededRandom(seed + 2000) * 0.95,

      floatDelay:
        seededRandom(seed + 3000) * -8,
    };
  });
}

function parseSmallDonationCsv(
  csvText: string
): SmallDonationItem[] {
  const rows = parseCsv(csvText);

  if (rows.length <= 1) return [];

  const headers = rows[0].map((header) =>
    header.trim()
  );

  const idIndex = headers.indexOf("id");
  const displayNameIndex =
    headers.indexOf("displayName");
  const amountIndex = headers.indexOf("amount");
  const isVisibleIndex =
    headers.indexOf("is_visible");

  if (
    idIndex === -1 ||
    displayNameIndex === -1 ||
    amountIndex === -1 ||
    isVisibleIndex === -1
  ) {
    console.warn(
      "소액기부자 스프레드시트의 헤더는 id, displayName, amount, is_visible 이어야 합니다."
    );

    return [];
  }

  return rows
    .slice(1)
    .map((row, index) => {
      const id =
        row[idIndex]?.trim() ||
        `small-donation-${index}`;

      const displayName =
        row[displayNameIndex]?.trim() ?? "";

      const amount = parseAmount(row[amountIndex]);

      const isVisible = parseBoolean(
        row[isVisibleIndex]
      );

      return {
        id,
        displayName,
        amount,
        isVisible,
      };
    })
    .filter((item) => {
      return item.displayName && item.isVisible;
    });
}

function parseAmount(value?: string) {
  if (!value) return 0;

  const number = Number(
    value.replace(/[^\d]/g, "")
  );

  return Number.isNaN(number) ? 0 : number;
}

function parseBoolean(value?: string) {
  if (!value) return false;

  const normalized = value
    .trim()
    .toLowerCase();

  return [
    "true",
    "TRUE",
    "1",
    "yes",
    "y",
    "공개",
  ].includes(normalized);
}

function parseCsv(text: string) {
  const rows: string[][] = [];
  let row: string[] = [];
  let value = "";
  let insideQuote = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"' && nextChar === '"') {
      value += '"';
      i += 1;
      continue;
    }

    if (char === '"') {
      insideQuote = !insideQuote;
      continue;
    }

    if (char === "," && !insideQuote) {
      row.push(value);
      value = "";
      continue;
    }

    if (
      (char === "\n" || char === "\r") &&
      !insideQuote
    ) {
      if (char === "\r" && nextChar === "\n") {
        i += 1;
      }

      row.push(value);
      rows.push(row);
      row = [];
      value = "";
      continue;
    }

    value += char;
  }

  row.push(value);
  rows.push(row);

  return rows.filter((csvRow) =>
    csvRow.some((cell) => cell.trim())
  );
}


const SMALL_DONATION_SCALE = 0.8;

function getSmallDonationCellSize(wallWidth: number) {
  const base =
    wallWidth < 768
      ? wallWidth / 9
      : wallWidth / 34;

  return Math.max(28, Math.min(base, 56)) * SMALL_DONATION_SCALE;
}

function hashString(value: string) {
  let hash = 0;

  for (let i = 0; i < value.length; i += 1) {
    hash =
      (hash << 5) -
      hash +
      value.charCodeAt(i);

    hash |= 0;
  }

  return Math.abs(hash);
}

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;

  return x - Math.floor(x);
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
    2 + seededRandom(seed + 2) * 15;

  const ampY =
    2 + seededRandom(seed + 3) * 15;

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