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
        <div className="max-w-[1000px] pb-10 pt-5 px-10 text-black">
    <div className="relative mb-12">
  <h2 className="text-center font-display pb-5 text-4xl leading-tight">
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
            
            <div >
                <div className="relative h-30 w-30 overflow-hidden bg-neutral-100">
                  <img
                    src="/imgs/icon1.jpg"
                    alt=""
                    className=" h-full w-full object-cover"
                  />
                </div>
              <h3 className=" font-bold text-xl pt-5 pb-5">
               1. 약정하기
              </h3>

              <p className="mt-1  leading-relaxed">
            모든 온라인 약정은 개인정보 보호법 제15조, 24조에 의거하여 정보주체의 동의 하에 실명인증단계를 거친 후 약정을 진행하실 수 있습니다.
              </p>
<a
  href="https://secure.donus.org/snuf/pay/step1?dontype=P060103"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-block border border-black px-4 py-2 mt-3 text-sm"
>
  온라인 약정 참여하기
</a>

     <p className="mt-4 text-sm leading-relaxed pt-5">
      오프라인 약정을 원하시는 경우, 하단의 연락처로 연락주시면 상세히 안내해드리겠습니다. 
</p>
            </div>

            {/* 2 */}
            <div >
                   <div className="relative h-30 w-30 overflow-hidden bg-neutral-100">
                  <img
                    src="/imgs/icon2.jpg"
                    alt=""
                    className=" h-full w-full object-cover"
                  />
                </div>
              <h3 className="font-bold  text-xl pt-5 pb-5">
                2. 납입하기
              </h3>

              <p className="mt-1 leading-relaxed">
온라인 약정은 약정과 동시에 납입이 가능하고, 오프라인 약정은 참여신청서를 미술대학 디자인과 학과사무실에 제출하신 후 무통장입금·자동이체·카드납부·교직원 급여 공제 중에 가능합니다.
              </p>
            </div>

            {/* 3 */}
            <div >
                     <div className="relative h-30 w-30 overflow-hidden bg-neutral-100">
                  <img
                    src="/imgs/icon3.jpg"
                    alt=""
                    className=" h-full w-full object-cover"
                  />
                </div>
              <h3 className="font-bold  text-xl pt-5 pb-5">
                3. 기부금 영수증 받기
              </h3>

              <p className="mt-1  leading-relaxed">
기부금 납입 후 7일 전후로 서울대학교 발전재단에서 기부금 영수증을 참여신청서에 기재된 주소로 송부합니다.
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