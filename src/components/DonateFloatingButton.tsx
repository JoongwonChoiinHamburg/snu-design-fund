"use client";

import { useState } from "react";
import LayerPopup from "./LayerPopup";

export default function DonateFloatingButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* floating button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[9999] border border-black bg-[#ff5a00] px-6 py-4 font-display text-lg font-bold text-black shadow-lg transition hover:translate-y-[-2px]"
      >
        기부하기
      </button>

      {/* popup */}
      <LayerPopup
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className="max-w-[1000px] text-black">
          <div className="mb-12 flex items-start justify-between gap-6">
            <div>
              <h2 className="font-display text-4xl leading-tight">
                기부 안내
              </h2>

              <p className="mt-4  text-lg leading-relaxed text-black/70">
                여러분의 기부는 학생들이 더 오래 탐구하고, 실패하고, <br></br>다시 시도할 수 있는 환경을 만드는 데 사용됩니다.
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
            {/* 1 */}
            
            <div >
                <div className="relative aspect-video overflow-hidden bg-neutral-100">
                  <img
                    src="/imgs/icon1.jpg"
                    alt=""
                    className=" h-full w-full object-cover"
                  />
                </div>
              <h3 className="font-display text-2xl ">
               약정하기
              </h3>

              <p className="mt-4 text-sm leading-relaxed">
            약정하는 방법에 대해 안내합니다.
              </p>
            </div>

            {/* 2 */}
            <div >
                <div className="relative aspect-video overflow-hidden bg-neutral-100">
                  <img
                    src="/imgs/icon2.jpg"
                    alt=""
                    className=" h-full w-full object-cover"
                  />
                </div>
              <h3 className="font-display text-2xl ">
                납입하기
              </h3>

              <p className="mt-4 text-sm leading-relaxed">
납입하는 방법에 대해 안내합니다.
              </p>
            </div>

            {/* 3 */}
            <div >
                  <div className="relative aspect-video overflow-hidden bg-neutral-100">
                  <img
                    src="/imgs/icon3.jpg"
                    alt=""
                    className=" h-full w-full object-cover"
                  />
                </div>
              <h3 className="font-display text-2xl">
                기부금 영수증 받기
              </h3>

              <p className="mt-4 text-sm leading-relaxed">
기부금 영수증을 받는 법에 대해 안내합니다.
              </p>
            </div>
          </div>

          <div className="mt-14 border-t border-black pt-6">
            <div className="flex flex-col gap-3 text-sm md:flex-row md:items-center md:justify-between">
              <div>
                서울대학교 디자인학부 발전기금
              </div>

              <div className="text-black/70">
                design@snu.ac.kr
              </div>
            </div>
          </div>
        </div>
      </LayerPopup>
    </>
  );
}