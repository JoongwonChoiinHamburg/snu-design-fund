"use client";

import { useEffect, useState } from "react";
import LayerPopup from "./LayerPopup";


const DONATE_PATTERNS = [
  "light1",
  "light2",
  "light3",
  "light4",
];


export default function DonateFloatingButton() {
  const [open, setOpen] = useState(false);

const [donatePattern, setDonatePattern] = useState<string | null>(null);

useEffect(() => {
  const randomPattern =
    DONATE_PATTERNS[
      Math.floor(Math.random() * DONATE_PATTERNS.length)
    ];

  setDonatePattern(randomPattern);
}, []);


  return (
    <>
      {/* floating button */}
{!open && (
  <button
    type="button"
    onClick={() => setOpen(true)}
    className="
      donate-floating-button
      donate-pattern-button
      fixed bottom-3 right-3 z-[9999]
      overflow-hidden
      border-b-2 border-r-2
      px-6 py-4
      font-display text-lg font-bold text-black
      shadow-lg transition
      hover:-translate-y-0.5
      md:bottom-6 md:right-6
      lg:aspect-square
    "
    style={
      donatePattern
        ? {
            backgroundImage: `url(/patterns/light/${donatePattern}.svg)`,
          }
        : {
            backgroundColor: "#ff5a00",
          }
    }
  >
    <span className="relative z-10">기부하기</span>
  </button>
)}
      {/* popup */}
      <LayerPopup
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className="max-w-[1000px]  text-black">
    <div className="relative mb-12">
  <h2 className="text-center font-display text-3xl leading-tight">
    기부 안내
  </h2>

  <button
    type="button"
    className="absolute right-0 top-0 px-4 pb-4 pt-0 text-4xl"
    onClick={() => setOpen(false)}
  >

  </button>
</div>

          <div className="grid gap-10 md:grid-cols-3">
            {/* 1 */}
            
 <div className="grid grid-cols-[96px_1fr] border-b border-black pb-5 md:border-none gap-x-5 gap-y-2 md:block">
  <div className="row-span-2">
    <div className="relative h-24 w-24 overflow-hidden bg-neutral-100 md:h-30 md:w-30">
      <img
        src="/imgs/icon1.jpg"
        alt=""
        className="h-full w-full object-cover"
      />
    </div>

    <h3 className="mt-3 font-bold text-base leading-snug md:pb-5 md:pt-5 md:text-xl">
      1. 약정하기
    </h3>
  </div>

  <div>
    <p className="leading-relaxed">
      모든 온라인 약정은 개인정보 보호법 제15조, 24조에 의거하여
      정보주체의 동의 하에 실명인증단계를 거친 후 약정을 진행하실 수 있습니다.
    </p>

    <a
      href="https://secure.donus.org/snuf/pay/step1?dontype=P240107"
      target="_blank"
      rel="noopener noreferrer"
      className="mt-3 inline-block border border-black px-4 py-2 text-sm"
    >
      온라인 약정 참여하기
    </a>

    <p className="mt-4 text-sm leading-relaxed">
      오프라인 약정을 원하시는 경우, 하단의 연락처로 연락주시면
      상세히 안내해드리겠습니다.
    </p>
  </div>
</div>

            {/* 2 */}
<div className="grid grid-cols-[96px_1fr] border-b border-black pb-5 md:border-none gap-x-5 gap-y-2 md:block">
  <div className="row-span-2">
    <div className="relative h-24 w-24 overflow-hidden bg-neutral-100 md:h-30 md:w-30">
      <img
        src="/imgs/icon2.jpg"
        alt=""
        className="h-full w-full object-cover"
      />
    </div>

    <h3 className="mt-3 font-bold text-base leading-snug md:pb-5 md:pt-5 md:text-xl">
      2. 납입하기
    </h3>
  </div>

  <p className="leading-relaxed">
    온라인 약정은 약정과 동시에 납입이 가능하고, 오프라인 약정은
    참여신청서를 미술대학 디자인과 학과사무실에 제출하신 후
    무통장입금·자동이체·카드납부·교직원 급여 공제 중에 가능합니다.
  </p>
</div>

            {/* 3 */}
<div className="grid grid-cols-[96px_1fr] gap-x-5 gap-y-2 md:block">
  <div className="row-span-2">
    <div className="relative h-24 w-24 overflow-hidden bg-neutral-100 md:h-30 md:w-30">
      <img
        src="/imgs/icon3.jpg"
        alt=""
        className="h-full w-full object-cover"
      />
    </div>

    <h3 className="mt-3 font-bold text-base leading-snug md:pb-5 md:pt-5 md:text-xl">
      3. 기부금 영수증 받기
    </h3>
  </div>

  <p className="leading-relaxed">
    기부금 납입 후 7일 전후로 서울대학교 발전재단에서 기부금 영수증을
    참여신청서에 기재된 주소로 송부합니다.
  </p>
</div>
          </div>

          <div className="mt-14 border-t border-black pt-6">
            <div className="flex flex-col gap-3 text-sm md:flex-row md:items-center md:justify-between">
              <div>
                미래디자이너를 위한 <br></br>창의환경 조성기금
              </div>
서울특별시 관악구 관악로 1 서울대학교 74동 2층  <br></br>디자인과사무실
              <div className="text-black/70 ">
              02-880-7512<br></br>
                tc03011@snu.ac.kr
         
              </div>
            </div>
          </div>
        </div>
      </LayerPopup>
    </>
  );
}