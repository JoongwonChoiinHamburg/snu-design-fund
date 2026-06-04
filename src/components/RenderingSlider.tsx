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
      <div className="relative overflow-hidden border border-black bg-neutral-100">
     <div className="relative overflow-hidden border border-black bg-neutral-100">
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
    className="absolute left-4 top-1/2 z-10 -translate-y-1/2 border border-black bg-white px-3 py-2 text-black"
  >
    ←
  </button>

  <button
    type="button"
    onClick={next}
    className="absolute right-4 top-1/2 z-10 -translate-y-1/2 border border-black bg-white px-3 py-2 text-black"
  >
    →
  </button>
</div>

        <button
          type="button"
          onClick={prev}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 border border-black bg-white px-3 py-2 text-black"
        >
          ←
        </button>

        <button
          type="button"
          onClick={next}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 border border-black bg-white px-3 py-2 text-black"
        >
          →
        </button>
      </div>

      <div className="mt-4 flex items-start justify-between gap-10">
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
  <h2 className="mb-10 mt-10 font-display text-3xl">
    여러분의 기부는 이렇게 활용됩니다.
  </h2>

  <div className="relative mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-0">
    <div className="relative z-40 border border-black bg-white p-12 lg:translate-x-6 lg:translate-y-4">
      <img
        src="/imgs/icon5.jpg"
        alt=""
        className="mb-5 h-25 w-25"
      />

      <h3 className="mb-3 font-bold text-xl">
        무빙월 설치
      </h3>

      <p className="leading-relaxed text-black/70">
        49동 리모델링 이후 다양한 전시와 수업이
        가능한 가변형 공간을 조성합니다.
      </p>
    </div>

   <div className="relative z-30 border border-black bg-white p-12  lg:rotate-[-1deg] lg:-translate-x-2 lg:-translate-y-3">
      <img
        src="/imgs/icon6.jpg"
        alt=""
        className="mb-5 h-25 w-25"
      />

      <h3 className="mb-3 font-bold text-xl">
        가구 및 기자재
      </h3>

      <p className="leading-relaxed text-black/70">
        학습과 실험을 위한 가구와
        교육 기자재를 확충합니다.
      </p>
    </div>

  <div className="relative z-20 border border-black bg-white lg:rotate-[0.7deg] p-12 lg:-translate-x-8 lg:translate-y-6">
      <img
        src="/imgs/icon7.jpg"
        alt=""
       className="mb-5 h-25 w-25"
      />

      <h3 className="mb-3 font-bold text-xl">
        휴식 공간
      </h3>

      <p className="leading-relaxed text-black/70">
        건물 주변의 쉼터와
        커뮤니티 공간을 조성합니다.
      </p>
    </div>

<div className="relative z-10 border border-black bg-white p-12 lg:-translate-x-12 lg:-translate-y-1">
      <img
        src="/imgs/icon8.jpg"
        alt=""
        className="mb-5 h-25 w-25"
      />

      <h3 className="mb-3 font-bold text-xl">
        창의 프로그램
      </h3>

      <p className="leading-relaxed text-black/70">
        글로벌 프로그램과 비교과 활동을 통해
        새로운 배움의 기회를 제공합니다.
      </p>
    </div>
  </div>
</div>
    </div>
  );
}