"use client";

import { useEffect } from "react";

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

  if (!open) return null;

  return (
    <div
      className={`
        fixed inset-0 z-50 bg-black/40

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
            z-[60]
            flex h-10 w-10
            items-center justify-center
            border border-black
            bg-white
            text-2xl leading-none

            ${
              isBottomSheet
                ? "absolute right-4 top-4"
                : "fixed right-4 top-4 md:absolute"
            }

            md:right-4
            md:top-4
          `}
        >
          ×
        </button>

        {children}
      </div>
    </div>
  );
}