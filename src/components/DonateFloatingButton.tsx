"use client";

import { useState } from "react";
import LayerPopup from "./LayerPopup";

export default function DonateFloatingButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[9999] border border-black bg-[#ff5a00] px-6 py-4 font-display text-lg font-bold text-black shadow-lg transition hover:-translate-y-0.5"
      >
        기부하기
      </button>

      <LayerPopup open={open} onClose={() => setOpen(false)}>
        <div className="max-w-[1000px] text-black">
          <div className="mb-10 flex items-start justify-between gap-6">
            <div>
              <h2 className="font-display text-4xl font-bold leading-tight">
                미래 디자이너의
                <br />
                탐험 공간 만들기
              </h2>

              <p className="mt-4 max-w-[520px] text-sm leading-relaxed text-black/70">
                여러분의 기부는 학생들이 더 오래 탐구하고, 실패하고,
                다시 시도할 수 있는 환경을 만드는 데 사용됩니다.
              </p>
            </div>

            <button
              type="button"
              className="border border-black px-4 py-2 text-sm"
              onClick={() => setOpen(false)}
            >
              닫기
            </button>
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            <div className="border-t border-black pt-5">
              <h3 className="font-display text-2xl font-bold">공간 네이밍</h3>
              <p className="mt-4 text-sm leading-relaxed">
                전시장과 대형 강의홀에 기부자의 이름을 부여합니다.
              </p>
            </div>

            <div className="border-t border-black pt-5">
              <h3 className="font-display text-2xl font-bold">좌석 기부</h3>
              <p className="mt-4 text-sm leading-relaxed">
                강의홀 좌석에 개인 명패를 부착합니다.
              </p>
            </div>

            <div className="border-t border-black pt-5">
              <h3 className="font-display text-2xl font-bold">
                공간 조성 기부
              </h3>
              <p className="mt-4 text-sm leading-relaxed">
                가구, 휴게공간, 학습환경 조성에 참여할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </LayerPopup>
    </>
  );
}
