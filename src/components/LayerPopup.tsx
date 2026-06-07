"use client";

import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function LayerPopup({
  open,
  onClose,
  children,
}: Props) {
  useEffect(() => {
    if (!open) return;

    document.body.classList.add("layer-popup-open");

    return () => {
      document.body.classList.remove("layer-popup-open");
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 z-50
        bg-black/40
        md:flex md:items-center md:justify-center md:p-4
      "
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="
          relative
          h-[100dvh] w-full
          overflow-y-auto
          bg-white
          px-5 pb-10 pt-16
          text-gray-900
          shadow-lg

          md:h-auto
          md:max-h-[90vh]
          md:max-w-[920px]
          md:rounded-lg
          md:p-10
        "
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label="팝업 닫기"
          onClick={onClose}
          className="
            fixed right-4 top-4 z-[60]
            flex h-10 w-10 items-center justify-center
            border border-black
            bg-white
            text-2xl leading-none

            md:absolute
            md:right-4
            md:top-4
          "
        >
          ×
        </button>

        {children}
      </div>
    </div>
  );
}