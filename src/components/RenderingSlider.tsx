"use client";

import { useState } from "react";

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
        <img
          src={slide.image}
          alt={slide.title}
          className="h-[520px] w-full object-cover"
        />

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
          <h3 className="font-display text-2xl font-bold">
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
      <div className="mt-10 border-t border-black pt-6">
  <div className="grid gap-8 md:grid-cols-3">
    <div>
      <h4 className="font-display text-lg font-bold uppercase tracking-wide">
        활용 계획
      </h4>
    </div>

    <div className="space-y-3 text-normal leading-relaxed">
      <div>49동 리모델링 이후 무빙월 설치</div>
      <div>가구 및 학습 기자재 구입</div>
    </div>

    <div className="space-y-3  text-normal  leading-relaxed">
      <div>건물 주변 휴식공간 조성</div>
      <div>
        글로벌 프로그램, 비교과 프로그램 운영
      </div>
    </div>
  </div>
</div>
    </div>
  );
}