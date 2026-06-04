"use client";

import { useState } from "react";
import { Seat } from "@/lib/csv";
import SeatMap from "./SeatMap";
import LayerPopup from "./LayerPopup";

type Props = {
  seats: Seat[];
};

export default function DonationPrograms({ seats }: Props) {
  const [openSeatMap, setOpenSeatMap] = useState(false);

  return (
    <>
    <section className="mx-auto mt-40 max-w-[1200px]">
      <div className="mb-10">
        <h2 className="font-display text-3xl ">
          기부 프로그램
        </h2>
      </div>

      <div className="grid gap-20 md:grid-cols-3">
        {/* 1 */}
        <div>
          <div className="mb-6  overflow-hidden bg-neutral-100">
            <img
              src="/donation/naming.jpg"
              alt="공간 네이밍 기부 프로그램"
              className="h-full w-full"
            />
          </div>

          <h3 className=" text-xl font-bold leading-snug">
            공간 네이밍 기부 프로그램
          </h3>

          <div className="mt-5 space-y-3  text-normal  leading-relaxed">
            <p>
              3억원 이상의 기부자를 대상으로 1층 전시장, 3층 대형강의홀, 각종 라운지 공간에 이름을 부여합니다.  
            </p>
<p>1억원 이상의 기부자를 대상으로 일반강의실 등의 공간에 이름을 부여합니다.</p>
          </div>
        </div>

        {/* 2 */}
        <div >
          <div className="mb-6  overflow-hidden bg-neutral-100">
            <img
              src="/donation/seat.jpg"
              alt="도네이션월 네이밍 기부 프로그램"
              className="h-full w-full "
            />
          </div>

          <h3 className=" text-xl font-bold leading-snug">
            도네이션월 네이밍 기부 프로그램

          </h3>

          <div className="mt-5 space-y-3  text-normal  leading-relaxed">
            <p>
         1천만원 이상 기부하신 분들은 웰컴라운지 벽면에 조성되는 도네이션월에 성함을 남겨드립니다.
            </p>
          </div>
                      
        </div>

        {/* 3 */}
        <div >
          <div className="mb-6  object-contain overflow-hidden bg-neutral-100">
            <img
              src="/donation/furniture.jpg"
              alt="대형강의홀 좌석 기부 프로그램"
              className="h-full w-full "
            />
          </div>

          <h3 className=" text-xl font-bold leading-snug">
            대형강의홀 좌석 기부 프로그램
          </h3>

          <div className="mt-5 space-y-3 text-normal leading-relaxed">
            <p>
 100만원 이상의 모든 기부자를 대상으로 3층 대형강의홀 고정식 좌석에 명패를 부착해 드립니다.
 </p>
 <p>
선착순 104명 참여 가능    </p>
 <p>
위치 지정과 문구 지정 후 명패 제작
            </p>
<button
  type="button"
  className="mt-5 border border-black bg-white px-4 py-2 text-sm text-black hover:bg-black hover:text-white"
  onClick={() => setOpenSeatMap(true)}
>
  좌석 보기
</button>
          </div>
        </div>
      </div>
    </section>

    <LayerPopup
  open={openSeatMap}
  onClose={() => setOpenSeatMap(false)}
>
  <div className="max-h-[80vh] overflow-auto text-black">
    <div className="mb-6 flex text-center items-start justify-between gap-6">
 <div className="mb-10 w-full text-center">
  <h3 className="font-display text-3xl">
    강의홀 좌석 기부
  </h3>

  <p className="mt-2 text-lg">
    원하는 좌석을 선택해 상태와 기부 정보를 확인할 수 있습니다.
  </p>
</div>


    </div>

    <SeatMap seats={seats} />
  </div>
</LayerPopup>
    </>
  );
}