"use client";

import { useEffect, useState } from "react";

type Slide = {
  image: string;
  title: string;
  description: string;
};

type Props = {
  slides: Slide[];
};

export default function RenderingSlider({
  slides,
}: Props) {
  const [index, setIndex] = useState(0);

  if (slides.length === 0) {
    return null;
  }

  const slide = slides[index];


useEffect(() => {
  if (slides.length <= 1) return;

  const timer = window.setInterval(() => {
    setIndex((current) =>
      current === slides.length - 1
        ? 0
        : current + 1
    );
  }, 5000);

  return () => {
    window.clearInterval(timer);
  };
}, [index, slides.length]);


  function prev() {
    setIndex((current) =>
      current === 0
        ? slides.length - 1
        : current - 1
    );
  }

  function next() {
    setIndex((current) =>
      current === slides.length - 1
        ? 0
        : current + 1
    );
  }

  return (
    <div className="w-full">
      <div className="relative overflow-hidden   bg-neutral-100">
     <div className="relative overflow-hidden  border-b-2 bg-neutral-100">
  <div
    className="flex transition-transform duration-700 ease-in-out"
    style={{
      transform: `translateX(-${index * 100}%)`,
    }}
  >
    {slides.map((item) => (
      <img
        key={item.image}
        src={item.image}
        alt={item.title}
        className="h-[520px] w-full shrink-0 object-cover"
      />
    ))}
  </div>

  <button
    type="button"
    onClick={prev}
    className="absolute left-4 top-1/2 z-10 -translate-y-1/2 border border-black bg-white px-3 py-2 text-[var(--color-grey)]"
  >
    ←
  </button>

  <button
    type="button"
    onClick={next}
    className="absolute right-4 top-1/2 z-10 -translate-y-1/2 border border-black bg-white px-3 py-2 text-[var(--color-grey)]"
  >
    →
  </button>
</div>

        <button
          type="button"
          onClick={prev}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 border border-black bg-white px-3 py-2 text-[var(--color-grey)]"
        >
          ←
        </button>

        <button
          type="button"
          onClick={next}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 border border-black bg-white px-3 py-2 text-[var(--color-grey)]"
        >
          →
        </button>
      </div>

      <div className=" px-5 mt-4 flex items-start justify-between gap-10 md:px-0 ">
        <div>
          <h3 className="text-2xl font-bold">
            {slide.title}
          </h3>

          <p className="mt-3 max-w-[760px] leading-relaxed">
            {slide.description}
          </p>
        </div>

        <div className="shrink-0 text-sm">
          {index + 1} / {slides.length}
        </div>
      </div>
<div className="mt-20 pt-6">
  <h2 className="px-5 mb-10 mt-10 font-display text-3xl lg:px-0 leading-relaxed">
    여러분의 기부는 <br className="md:hidden" />이렇게 활용됩니다.
  </h2>

  <div className="relative p-5 mt-12 grid gap-0 md:grid-cols-2 lg:grid-cols-4 lg:p-0 lg:gap-0">
    <div className="relative z-40 border border-black bg-white p-8 shadow-sm lg:p-12 w-80 lg:w-75  lg:translate-x-6 lg:translate-y-4">
      <img
        src="/imgs/icon5.jpg"
        alt=""
        className="mb-5 h-20 w-20 lg:h-25 lg:w-25"
      />

      <h3 className="mb-3 text-lg font-bold lg:text-xl">
        무빙월 설치
      </h3>

      <p className="leading-relaxed text-[var(--color-grey)]/70">
        49동 리모델링 이후 다양한 전시와 수업이
        가능한 가변형 공간을 조성합니다.
      </p>
    </div>

    <div className="relative z-30 -mt-8 ml-6 rotate-[-1deg] border border-black bg-white p-8 shadow-sm md:mt-0 md:ml-0 md:rotate-0 lg:p-12 lg:-translate-x-2 lg:-translate-y-3 lg:rotate-[-1deg]">
      <img
        src="/imgs/icon6.jpg"
        alt=""
        className="mb-5 h-20 w-20 lg:h-25 lg:w-25"
      />

      <h3 className="mb-3 text-lg font-bold lg:text-xl">
        가구 및 기자재
      </h3>

      <p className="leading-relaxed text-[var(--color-grey)]/70">
        학습과 실험을 위한 가구와
        교육 기자재를 확충합니다.
      </p>
    </div>

    <div className="relative z-20 -mt-8 mr-4 rotate-[0.8deg] border border-black bg-white p-8 shadow-sm md:mt-0 md:mr-0 md:rotate-0 lg:p-12 lg:-translate-x-8 lg:translate-y-6 lg:rotate-[0.7deg]">
      <img
        src="/imgs/icon7.jpg"
        alt=""
        className="mb-5 h-20 w-20 lg:h-25 lg:w-25"
      />

      <h3 className="mb-3 text-lg font-bold lg:text-xl">
        휴식 공간
      </h3>

      <p className="leading-relaxed text-[var(--color-grey)]/70">
        건물 주변의 쉼터와
        커뮤니티 공간을 조성합니다.
      </p>
    </div>

    <div className="relative z-10 -mt-8 ml-8 rotate-[-0.6deg] border border-black bg-white p-8 shadow-sm md:mt-0 md:ml-0 md:rotate-0 lg:p-12 lg:-translate-x-12 lg:-translate-y-1">
      <img
        src="/imgs/icon8.jpg"
        alt=""
        className="mb-5 h-20 w-20 lg:h-25 lg:w-25"
      />

      <h3 className="mb-3 text-lg font-bold lg:text-xl">
        창의 프로그램
      </h3>

      <p className="leading-relaxed text-[var(--color-grey)]/70">
        글로벌 프로그램과 비교과 활동을 통해
        새로운 배움의 기회를 제공합니다.
      </p>
    </div>
  </div>
</div>
    </div>
  );
}