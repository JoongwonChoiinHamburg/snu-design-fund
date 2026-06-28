"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  mobileMode?: "fullscreen" | "bottom";
};

export default function LayerPopup({
  open,
  onClose,
  children,
  mobileMode = "fullscreen",
}: Props) {
  const isBottomSheet = mobileMode === "bottom";

const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

  useEffect(() => {
    if (!open) return;

    document.body.classList.add("layer-popup-open");

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("layer-popup-open");
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!mounted || !open) return null;

return createPortal(
  <div
    className={`
      fixed inset-0 z-[9999] bg-[var(--color-grey)]/40

      ${
        isBottomSheet
          ? "flex items-end"
          : "flex items-stretch"
      }

      md:items-center
      md:justify-center
      md:p-4
    `}
    onClick={onClose}
  >
    <div
      role="dialog"
      aria-modal="true"
      className={`
        relative
        w-full
        overflow-y-auto
        bg-white
        text-gray-900
        shadow-lg

        ${
          isBottomSheet
            ? `
              h-[35dvh]
              rounded-t-2xl
              px-5 pb-10 pt-7
            `
            : `
              h-[100dvh]
              px-5 pb-10 pt-16
            `
        }

        md:h-auto
        md:max-h-[90vh]
        md:max-w-[920px]
        md:rounded-lg
        md:p-10
      `}
      onClick={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        aria-label="팝업 닫기"
        onClick={onClose}
        className={`
          group
          z-[60]
          flex h-8 w-8
          items-center justify-center
          bg-white
          transition
          hover:bg-[var(--color-grey)]

          ${
            isBottomSheet
              ? "absolute right-4 top-4"
              : "fixed right-4 top-4 md:absolute"
          }

          md:right-5
          md:top-5
        `}
      >
        <span
          className="
            relative
            block
            h-6
            w-6

            before:absolute
            before:left-1/2
            before:top-0
            before:h-full
            before:w-px
            before:-translate-x-1/2
            before:rotate-45
            before:bg-[var(--color-grey)]
            before:transition

            after:absolute
            after:left-1/2
            after:top-0
            after:h-full
            after:w-px
            after:-translate-x-1/2
            after:-rotate-45
            after:bg-[var(--color-grey)]
            after:transition

            group-hover:before:bg-white
            group-hover:after:bg-white
          "
        />
      </button>

      {children}
    </div>
  </div>,
  document.body
);
}