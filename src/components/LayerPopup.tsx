"use client";

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function LayerPopup({ open, onClose, children }: Props) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
          className="w-[320px] rounded-lg bg-white p-6 shadow-lg text-gray-900"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}