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
         1천만원 이상 기부하신 분들은 웰컴라운지 벽면에 조성되는 도너스월에 성함을 남겨드립니다.
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
  도너스텝 보기
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
 100만원을 기부하신 분들을 대상으로 3층 대형강의홀 고정식 좌석에 명패를 부착해 드립니다.
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

];

type SpaceNamingSpace = {
  title: string;
  amount: string;
  description: string[];
  mapImage?: string;
  renderingImage: string;
};

type SpaceNamingTab = {
  id: string;
  label: string;
  spaces: SpaceNamingSpace[];
};

const SPACE_NAMING_TABS: SpaceNamingTab[] = [
  {
    id: "tab-1",
    label: "주요 공간 (3-5억)",
    spaces: [
      {
        title: "대형 강의홀",
        amount: "1억원",
         description: [
      "3층",
      "100석 규모의 계단식 대형 강의실",
      "강연 및 학술세미나 개최",
      "대외 네이밍 홍보 효과",
    ],
        mapImage: "/donation/plan1.svg",
        renderingImage: "/donation/donation-render1.png",
      },
      {
        title: "디자인갤러리 (구 삼원S&D홀)",
        amount: "1억원",
    description: [
      "1층",
      "높은 천정고의 디자인과 메인 전시공간",
      "리모델링으로 높아진 접근성",

    ],
        mapImage: "/donation/plan2.svg",
        renderingImage: "/donation/donation-render2.png",
      },
    ],
  },
  {
    id: "tab-2",
    label: "주요 공간 (3억)",
    spaces: [
            {
        title: "이벤트 라운지",
        amount: "1억원",
    description: [
      "지하1층",
      "졸업전시 오프닝 등 이벤트 및 파티 개최",
      "대형 LED월",
    ],
        mapImage: "/donation/plan3.svg",
        renderingImage: "/donation/donation-render3.png",
      },
    
      {
        title: "주출입구 웰컴라운지",
        amount: "5천만원",
    description: [
      "1층",
      "49동 주출입구 휴게공간",
      "가장 높은 노출도 ",

    ],
        mapImage: "/donation/plan4.svg",
        renderingImage: "/donation/donation-render4.png",
      },
       {
        title: "Fab Lab",
        amount: "5천만원",
    description: [
      "지하 1층",
      "첨단기술기반 모형제작공간",
    ],
        mapImage: "/donation/plan5.svg",
        renderingImage: "/donation/donation-render5.png",
      },
    ],
  },
  {
    id: "tab-3",
    label: "일반 공간 (1억)",
    spaces: [
      {
        title: "디지털 스튜디오",
        amount: "3천만원",
    description: [
      "1층",
      "시각디자인 전공 학생들의 메인 스튜디오",
    ],
        mapImage: "/donation/plan6.svg",
        renderingImage: "/donation/donation-render6.png",
      },
      {
        title: "피지컬 스튜디오",
        amount: "3천만원",
    description: [
      "2층",
      "산업디자인 전공 학생들의 메인 스튜디오",

    ],
        mapImage: "/donation/plan7.svg",
        renderingImage: "/donation/donation-render7.png",
      },
      {
        title: "전망 라운지",
        amount: "3천만원",
    description: [
      "2층",
      "채광이 좋은 연결공간",
      "소규모 전시 및 휴게 라운지",

    ],
        mapImage: "/donation/plan8.svg",
        renderingImage: "/donation/donation-render8.png",
      },
    ],
  },
];

function SpaceNamingPopupContent() {
  const [activeTabId, setActiveTabId] = useState(
    SPACE_NAMING_TABS[0].id
  );

  const activeTab =
    SPACE_NAMING_TABS.find(
      (tab) => tab.id === activeTabId
    ) ?? SPACE_NAMING_TABS[0];

  return (
    <div className="w-full max-w-[1100px] text-[var(--color-grey)]">
      <div className="mb-8 text-center md:mb-10">
        <h3 className="font-display text-4xl leading-tight md:text-5xl">
          공간 네이밍 기부
        </h3>


      </div>

     <div
  className="
    sticky
    top-0
    z-20
    -mx-5
    mb-8
    overflow-x-auto
    bg-white/95
    px-5
    py-3
    backdrop-blur

    md:mx-0
    md:mb-10
    md:overflow-visible
    md:px-0
  "
>
  <div
    className="
      flex
      min-w-max
      items-center
      justify-center
      gap-6

      md:min-w-0
      md:gap-10
    "
  >
    {SPACE_NAMING_TABS.map((tab) => {
      const active = tab.id === activeTabId;

      return (
        <button
          key={tab.id}
          type="button"
          onClick={() => setActiveTabId(tab.id)}
          className={`
            relative
            py-2
            text-sm
            font-semibold
            transition

            md:text-base

            ${
              active
                ? "text-[var(--color-grey)]"
                : "text-[var(--color-grey)]/45 hover:text-[var(--color-grey)]"
            }
          `}
        >
          {tab.label}

          {active && (
            <span
              className="
                absolute
                bottom-0
                left-0
                h-px
                w-full
                bg-[var(--color-grey)]
              "
            />
          )}
        </button>
      );
    })}
  </div>
</div>

      <div className="space-y-10 md:space-y-14">
        {activeTab.spaces.map((space) => (
          <SpaceNamingSection
            key={space.title}
            space={space}
          />
        ))}
      </div>
    </div>
  );
}


function SpaceNamingSection({
  space,
}: {
  space: SpaceNamingSpace;
}) {
  return (
    <section
      className="
        border-t
        border-black
         first:border-t-0
        pt-6

        md:grid
        md:grid-cols-[250px_1fr]
        md:gap-8
        md:pt-8
      "
    >
      <div className="mb-5 md:mb-0">
        <h4 className="text-2xl font-bold leading-tight">
          {space.title}
        </h4>


  <ul className="mt-4 space-y-1 text-sm leading-relaxed">
  {space.description.map((item) => (
    <li
      key={item}
      className="flex gap-2"
    >
      <span aria-hidden="true">·</span>
      <span>{item}</span>
    </li>
  ))}
</ul>

        {space.mapImage && (
          <img
            src={space.mapImage}
            alt=""
            className="mt-5 w-full max-w-[220px]"
          />
        )}
      </div>

<div
  className="
    aspect-[4/3]
    overflow-hidden
    border-b
    border-black
    bg-neutral-100

    md:aspect-auto
    md:h-full
    md:min-h-[320px]
  "
>
  <img
    src={space.renderingImage}
    alt=""
    className="
      h-full
      w-full
      object-cover
      object-center
    "
  />
</div>
    </section>
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