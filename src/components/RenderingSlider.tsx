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

  <div className="relative mt-12 grid gap-y-5 p-5 md:grid-cols-2 md:gap-0 lg:grid-cols-3 lg:p-0">
    <div className="relative z-40 border border-black bg-white p-8 shadow-sm lg:p-12 lg:translate-x-6 lg:translate-y-4">
      <img
        src="/imgs/icon5.svg"
        alt=""
    
      />


    <h4 className="mt-10 mb-5 font-bold"> <span className="font-normal">목표 금액 </span>10억원 <span className="font-normal">| 모금기간 </span> 2026년 6월-12월</h4>
      <p className="leading-relaxed text-lg text-[var(--color-grey)]">
비용 문제로 구현하지 못했던 설계안의 내용들을
추가 반영합니다.
      </p>
    </div>

    <div className="relative z-30 -mt-8 ml-6 rotate-[-3deg] border border-black bg-white p-8 shadow-sm md:mt-0 md:ml-0 md:rotate-0 lg:p-12 lg:-translate-x-2 lg:-translate-y-3 lg:rotate-[-1deg]">
      <img
        src="/imgs/icon6.svg"
        alt=""
      
      />


 <h4 className="mt-10 mb-5 font-bold"> <span className="font-normal">목표 금액 </span>10억원 <span className="font-normal">| 모금기간 </span> 2027년 1월-6월</h4>
      <p className="leading-relaxed text-lg text-[var(--color-grey)]">
학습과 실습을 위한 가구, 교육 기자재를 확보하고
사이니지 시스템을 구축합니다.
      </p>
    </div>

    <div className="relative z-20 -mt-8 mr-4 rotate-[0.8deg] border border-black bg-white p-8 shadow-sm md:mt-0 md:mr-0 md:rotate-0 lg:p-12 lg:-translate-x-8 lg:translate-y-6 lg:rotate-[0.7deg]">
      <img
        src="/imgs/icon8.svg"
        alt=""
        
      />


    <h4 className="mt-10 mb-5 font-bold"> <span className="font-normal">목표 금액 </span>10억원 <span className="font-normal">| 모금기간 </span> 2027년 6월-12월</h4>
      <p className="leading-relaxed text-lg  text-[var(--color-grey)]">
첨단 기자재와 창의 프로그램을 통해 학생들에게 새로운 배움의 기회를 제공합니다.
      </p>
    </div>

  </div>
</div>
    </div>
  );
}