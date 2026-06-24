"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import PatternWall from "@/components/PatternWall";
import SmallDonationPatternWall from "@/components/SmallDonationPatternWall";

import { DonorBlock } from "@/lib/pattern";

type Props = {
  blocks: DonorBlock[];
};

const AUTO_SLIDE_DELAY = 8000;

const WALLS = [
  {
    key: "fund",

    toast: "Digital Donor wall 1",
  },
  {
    key: "small",

    toast: "Digital Donor wall 2",
  },
];

export default function DonationWallSlider({
  blocks,
}: Props) {
  const [activeIndex, setActiveIndex] =
    useState(0);

  const [toastMessage, setToastMessage] =
    useState<string | null>(null);

  const toastTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(
      null
    );

const autoSlideTimerRef =
  useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

const lastActivityRef = useRef(0);

const [lastActivityAt, setLastActivityAt] =
  useState(Date.now());

function resetAutoSlideTimer() {
  const now = Date.now();

  // mousemove가 너무 자주 발생해서 0.3초에 한 번만 리셋
  if (now - lastActivityRef.current < 300) {
    return;
  }

  lastActivityRef.current = now;
  setLastActivityAt(now);
}

  function showToast(message: string) {
    setToastMessage(message);

    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }

    toastTimerRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 1600);
  }

function goTo(index: number) {
  if (index === activeIndex) return;

  resetAutoSlideTimer();
  setActiveIndex(index);
  showToast(WALLS[index].toast);
}

const canGoPrev = activeIndex > 0;
const canGoNext = activeIndex < WALLS.length - 1;


useEffect(() => {
  if (autoSlideTimerRef.current) {
    clearTimeout(autoSlideTimerRef.current);
  }

  autoSlideTimerRef.current = setTimeout(() => {
    const nextIndex =
      activeIndex === 0 ? 1 : 0;

    setActiveIndex(nextIndex);
    showToast(WALLS[nextIndex].toast);
  }, AUTO_SLIDE_DELAY);

  return () => {
    if (autoSlideTimerRef.current) {
      clearTimeout(autoSlideTimerRef.current);
    }
  };
}, [activeIndex, lastActivityAt]);

function goPrev() {
  if (!canGoPrev) return;

  goTo(activeIndex - 1);
}

function goNext() {
  if (!canGoNext) return;

  goTo(activeIndex + 1);
}
return (
  <section
    className="relative w-full overflow-hidden"
    onPointerMove={resetAutoSlideTimer}
    onPointerDown={resetAutoSlideTimer}
    onTouchStart={resetAutoSlideTimer}
    onWheel={resetAutoSlideTimer}
    onFocusCapture={resetAutoSlideTimer}
  >
      {/* toast */}
      {toastMessage && (
        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-6
            z-[80]
            -translate-x-1/2
            border-2
            border-black
            bg-white
            px-5
            py-3
            text-sm
            font-semibold
            text-[var(--color-grey)]
            shadow-sm
            md:text-base
          "
        >
          {toastMessage}
        </div>
      )}

      {/* left arrow */}
{canGoPrev && (
  <button
    type="button"
    onClick={goPrev}
    className="
      absolute
      left-3
      top-1/2
      z-[70]
      flex
      h-10
      w-10
      -translate-y-1/2
      items-center
      justify-center
      border-2
      border-black
      bg-white
      text-xl
      leading-none
      text-[var(--color-grey)]
      transition-transform
      hover:scale-110
      md:left-6
      md:h-12
      md:w-12
      md:text-2xl
    "
    aria-label="이전 패턴월 보기"
  >
    ←
  </button>
)}

      {/* right arrow */}
{canGoNext && (
  <button
    type="button"
    onClick={goNext}
    className="
      absolute
      right-3
      top-1/2
      z-[70]
      flex
      h-10
      w-10
      -translate-y-1/2
      items-center
      justify-center
      border-2
      border-black
      bg-white
      text-xl
      leading-none
      text-[var(--color-grey)]
      transition-transform
      hover:scale-110
      md:right-6
      md:h-12
      md:w-12
      md:text-2xl
    "
    aria-label="다음 패턴월 보기"
  >
    →
  </button>
)}



      {/* slides */}
      <div
        className="
          flex
          transition-transform
          duration-700
          ease-in-out
        "
        style={{
          transform: `translateX(-${
            activeIndex * 100
          }%)`,
        }}
      >
        <div className="min-w-full">
          <PatternWall blocks={blocks} />
        </div>

        <div className="min-w-full">
          <SmallDonationPatternWall/>
        </div>
      </div>
    </section>
  );
}