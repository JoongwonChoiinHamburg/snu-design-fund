"use client";

import { useState } from "react";
import { Seat } from "@/lib/csv";
import SeatMap from "./SeatMap";
import LayerPopup from "./LayerPopup";
import PopupScrollArea from "./PopupScrollArea";

type Props = {
  seats: Seat[];
};

export default function DonationPrograms({ seats }: Props) {
const [openSeatMap, setOpenSeatMap] = useState(false);
const [openSpaceNaming, setOpenSpaceNaming] = useState(false);
const [openDonorWall, setOpenDonorWall] = useState(false);
const [openDonorStep, setOpenDonorStep] = useState(false);
  return (
    <>
    <section className="mx-auto mt-40 max-w-[1200px] px-5 md:px-0">
      <div className="mb-10">
        <h2 className="font-display text-3xl ">
          기부 프로그램
        </h2>
      </div>

      <div className="grid gap-20 md:grid-cols-4">
        {/* 1 */}
        <div>
          <div className="mb-6 flex h-62 w-62 items-end overflow-hidden  lg:h-70 lg:w-70">
            <img
              src="/donation/do1.svg"
              alt="공간 네이밍 기부 프로그램"
              className="h-full w-full object-contain"
            />
          </div>

          <h3 className=" text-xl font-bold leading-snug">
            공간 네이밍 기부
          </h3>

          <div className="mt-5 space-y-3  text-normal  leading-relaxed">
            <p>
              3억원 이상의 기부자를 대상으로 1층 전시장, 3층 대형강의홀, 각종 라운지 공간에 이름을 부여합니다.  
            </p>
<p>1억원 이상의 기부자를 대상으로 일반강의실 등의 공간에 이름을 부여합니다.</p>
<button
  type="button"
  className="mt-5 border border-black bg-white px-4 py-2 text-sm text-[var(--color-grey)] hover:bg-black hover:text-white"
  onClick={() => setOpenSpaceNaming(true)}
>
  공간 보기
</button>
          </div>
        </div>

        {/* 2 */}
        <div >
           <div className="mb-6 flex h-62 w-62 items-end overflow-hidden lg:h-70 lg:w-70">
            <img
              src="/donation/do2.svg"
              alt="도네이션월 네이밍 기부 프로그램"
              className="h-full w-full object-contain"
            />
          </div>

          <h3 className=" text-xl font-bold leading-snug">
            도너스월 네이밍 기부

          </h3>

          <div className="mt-5 space-y-3  text-normal  leading-relaxed">
            <p>
         1천만원 이상 기부하신 분들은 웰컴라운지 벽면에 조성되는 도네이션월에 성함을 남겨드립니다.
            </p>

            <button
  type="button"
  className="mt-5 border border-black bg-white px-4 py-2 text-sm text-[var(--color-grey)] hover:bg-black hover:text-white"
  onClick={() => setOpenDonorWall(true)}
>
  도너스 월 보기
</button>
          </div>
                      
        </div>

        {/* 3 */}
        <div >
           <div className="mb-6 flex h-62 w-62 items-end overflow-hidden  lg:h-70 lg:w-70">
            <img
              src="/donation/do3.svg"
              alt="대형강의홀 좌석 "
              className="h-full w-full object-contain"
            />
          </div>

          <h3 className=" text-xl font-bold leading-snug">
            도너스텝 네이밍 기부
          </h3>

          <div className="mt-5 space-y-3 text-normal leading-relaxed">
            <p>
 250만원을 기부하신 분들은 디자인 연구동의 계단 한 칸에 성함을 남겨드립니다.
 </p>
 <p className="text-sm">
 · 선착순 77명 참여 가능 <br></br>
  · 복수 후원 가능<br></br>
  · 계단 칸과 문구 지정후 표기
 
            </p>
<button
  type="button"
  className="mt-5 border border-black bg-white px-4 py-2 text-sm text-[var(--color-grey)] hover:bg-black hover:text-white"
  onClick={() => setOpenDonorStep(true)}
>
  도너스 스텝 보기
</button>
          </div>
        </div>
      {/* 4 */}
                <div >
          <div className="mb-6 flex h-62 w-62 items-end overflow-hidden lg:h-70 lg:w-70">
            <img
              src="/donation/do4.svg"
              alt="대형강의홀 좌석 네이밍 기부"
              className="h-full w-full object-contain"
            />
          </div>

          <h3 className=" text-xl font-bold leading-snug">
            대형강의홀 좌석 네이밍 기부
          </h3>

          <div className="mt-5 space-y-3 text-normal leading-relaxed">
            <p>
 100만원 이상의 모든 기부자를 대상으로 3층 대형강의홀 고정식 좌석에 명패를 부착해 드립니다.
 </p>
 <p className="text-sm">
· 선착순 94명 참여 가능 <br></br>
· 복수 후원 불가  <br></br>
· 위치와 문구 지정 후 명패 제작
            </p>
<button
  type="button"
  className="mt-5 border border-black bg-white px-4 py-2 text-sm text-[var(--color-grey)] hover:bg-black hover:text-white"
  onClick={() => setOpenSeatMap(true)}
>
  좌석 보기
</button>
          </div>
        </div>
      </div>
    </section>

<LayerPopup
  open={openSpaceNaming}
  onClose={() => setOpenSpaceNaming(false)}
>
    <PopupScrollArea> 
       <SpaceNamingPopupContent />
    </PopupScrollArea>

</LayerPopup>

<LayerPopup
  open={openDonorWall}
  onClose={() => setOpenDonorWall(false)}
>
  <SingleProgramPopupContent
    title="도너스월 네이밍 기부 프로그램"
    item={DONOR_WALL_ITEM}
  />
</LayerPopup>

<LayerPopup
  open={openDonorStep}
  onClose={() => setOpenDonorStep(false)}
>
  <SingleProgramPopupContent
    title="도너스텝 기부 프로그램"
    item={DONOR_STEP_ITEM}
  />
</LayerPopup>

    <LayerPopup
  open={openSeatMap}
  onClose={() => setOpenSeatMap(false)}
>
    <PopupScrollArea>
  <div className="max-h-[80vh]  text-[var(--color-grey)]">
    <div className="mb-6 flex text-center items-start justify-between gap-6">
 <div className="mb-10 w-full text-center">
    <h3 className="font-display text-3xl leading-snug md:text-4xl">
    강의홀 좌석 기부
  </h3>


</div>
    </div>

    <SeatMap seats={seats} />
  </div>

    </PopupScrollArea>

</LayerPopup>



    </>
  );
}

const SPACE_NAMING_ITEMS = [
  {
    title: "대형강의홀",
    amount: "3억원 ~ 5억원",
    description: [
      "3층",
      "100석 규모의 계단식 대형 강의실",
      "강연 및 학술세미나 개최",
      "대외 네이밍 홍보 효과",
    ],
    mapImage: "/donation/space-naming/hall-map.svg",
    renderImage: "/donation/render1.png",
    mapAlt: "대형강의홀 위치도",
    renderAlt: "대형강의홀 렌더링",
  },
  {
    title: "주출입구 웰컴 라운지",
    amount: "3억원",
    description: [
      "1층",
      "49동 주출입구 휴게공간",
      "가장 높은 노출도",
    ],
    mapImage: "/donation/space-naming/welcome-lounge-map.svg",
   renderImage: "/donation/render2.png",
    mapAlt: "주출입구 웰컴 라운지 위치도",
    renderAlt: "주출입구 웰컴 라운지 렌더링",
  },
  {
    title: "디지털 스튜디오",
    amount: "1억원",
    description: [
      "1층",
      "시각디자인 전공 학생들의 메인 스튜디오",
    ],
    mapImage: "/donation/space-naming/event-lounge-map.svg",
    renderImage: "/donation/render3.png",
    mapAlt: "디지털 스튜디오 위치도",
    renderAlt: "디지털 스튜디오 렌더링",
  },
];

function SpaceNamingPopupContent() {
  return (
   <div className="text-[var(--color-grey)]">
      <div className="mb-14 text-center">
        <h3 className="font-display text-3xl leading-snug md:text-4xl">
          공간네이밍 기부 프로그램
        </h3>
      </div>

      <div className="space-y-16">
        {SPACE_NAMING_ITEMS.map((item, index) => (
          <section
            key={item.title}
            className="
              grid
              gap-8
              border-b
              border-black
              pb-14
              last:border-b-0
              last:pb-0
              md:grid-cols-[250px_1fr]
              md:gap-14
            "
          >
            {/* left text + map */}
            <div className="flex flex-col">
              <div>
                <h4 className="text-lg font-bold leading-snug md:text-xl">
                  {item.title}{" "}
                  <span className="font-bold">
                    ({item.amount})
                  </span>
                </h4>

                <div className="mt-8 space-y-1 text-base leading-relaxed md:text-sm">
                  {item.description.map((line) => (
                    <p key={line}>
                      · {line}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-10 md:mt-auto md:pt-16">
                <img
                  src={item.mapImage}
                  alt={item.mapAlt}
                  className="w-full"
                />
              </div>
            </div>

            {/* right render image */}
            <div>
              <img
                src={item.renderImage}
                alt={item.renderAlt}
                className="w-full object-cover"
              />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

const DONOR_WALL_ITEM = {
  title: "도너스월",
  amount: "1천만원 이상",
  description: [
    "1층 웰컴라운지 벽면에 조성되는 도너스월",
    "기부자의 성함을 공간 안에 남기는 프로그램",
    "49동을 방문하는 학생, 동문, 외부 방문객에게 높은 노출 효과",
  ],
  mapImage: "/donation/map5.svg",
  renderImage: "/donation/render5.jpg",
  mapAlt: "도너스월 위치도",
  renderAlt: "도너스월 렌더링",
};

const DONOR_STEP_ITEM = {
  title: "도너스텝",
  amount: "250만원",
  description: [
    "계단 한 칸에 성함을 남기는 프로그램",
    "선착순 77명 참여 가능",
    "복수 후원 가능",
    "계단 칸과 문구 지정 후 표기",
  ],
  mapImage: "/donation/map4.svg",
   renderImage: "/donation/render4.jpg",
  mapAlt: "도너스텝 위치도",
  renderAlt: "도너스텝 렌더링",
};

type SingleProgramItem = {
  title: string;
  amount: string;
  description: string[];
  mapImage: string;
  renderImage: string;
  mapAlt: string;
  renderAlt: string;
};

function SingleProgramPopupContent({
  title,
  item,
}: {
  title: string;
  item: SingleProgramItem;
}) {
  return (
    <div className="max-h-[80vh] overflow-y-auto text-[var(--color-grey)]">
      <div className="mb-14 text-center">
        <h3 className="font-display text-3xl leading-snug md:text-4xl">
          {title}
        </h3>
      </div>

      <section
        className="
          grid
          gap-8
          md:grid-cols-[280px_1fr]
          md:gap-10
        "
      >
        {/* left text + map */}
        <div className="flex flex-col">
          <div>
            <h4 className="text-lg font-bold leading-snug md:text-xl">
              {item.title}{" "}
              <span className="font-bold">
                ({item.amount})
              </span>
            </h4>

            <div className="mt-8 space-y-1 text-base leading-relaxed md:text-sm">
              {item.description.map((line, index) => (
                <p key={`${line}-${index}`}>
                  · {line}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-10 md:mt-auto md:pt-16">
            <img
              src={item.mapImage}
              alt={item.mapAlt}
              className="w-full"
            />
          </div>
        </div>

        {/* right render image */}
        <div>
          <img
            src={item.renderImage}
            alt={item.renderAlt}
            className="w-full object-cover"
          />
        </div>
      </section>
    </div>
  );
}