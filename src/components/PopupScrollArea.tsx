"use client";

import {
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

type Props = {
  children: ReactNode;
  maxHeightClassName?: string;
};

const THUMB_SIZE = 14;

export default function PopupScrollArea({
  children,
  maxHeightClassName = "max-h-[80vh]",
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [canScroll, setCanScroll] = useState(false);
  const [thumbTop, setThumbTop] = useState(0);
  const [trackHeight, setTrackHeight] = useState(0);

  function updateScrollbar() {
    const scrollEl = scrollRef.current;
    const trackEl = trackRef.current;

    if (!scrollEl || !trackEl) return;

    const maxScroll =
      scrollEl.scrollHeight - scrollEl.clientHeight;

    const nextCanScroll = maxScroll > 1;
    setCanScroll(nextCanScroll);

    const nextTrackHeight = trackEl.clientHeight;
    setTrackHeight(nextTrackHeight);

    if (!nextCanScroll) {
      setThumbTop(0);
      return;
    }

    const progress = scrollEl.scrollTop / maxScroll;
    const maxThumbTop =
      nextTrackHeight - THUMB_SIZE;

    setThumbTop(progress * maxThumbTop);
  }

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    updateScrollbar();

    scrollEl.addEventListener("scroll", updateScrollbar);
    window.addEventListener("resize", updateScrollbar);

    const resizeObserver = new ResizeObserver(updateScrollbar);
    resizeObserver.observe(scrollEl);

    return () => {
      scrollEl.removeEventListener("scroll", updateScrollbar);
      window.removeEventListener("resize", updateScrollbar);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className={`
          ${maxHeightClassName}
          overflow-y-auto
          pr-8
          scrollbar-hide
        `}
      >
        {children}
      </div>

    <div
  ref={trackRef}
  className="
    pointer-events-none
    absolute
    bottom-0
    w-4
  "
  style={{
    right: -12,
    top: 36,
  }}
>
        {canScroll && (
          <>
            <div
              className="
                absolute
                left-1/2
                top-0
                h-full
                w-px
                -translate-x-1/2
                bg-black/20
              "
            />

                    <div
            className="
                absolute
                h-[14px]
                w-[14px]
                rounded-full
                border
                border-black
                bg-white
            "
            style={{
                left: "50%",
                top: thumbTop,
                marginLeft: -THUMB_SIZE / 2,
            }}
            />
          </>
        )}
      </div>
    </div>
  );
}