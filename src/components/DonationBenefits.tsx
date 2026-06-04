const columns = [
  "1백만원 이상",
  "1천만원 이상",
  "1억원 이상",
  "3억원 이상",
  "5억원 이상",
];

const rows = [
    {
    title: "대형강의홀 좌석 명패",
    active: [true, true, true, true, true],
  },
  {
    title: "도네이션월 기재",
    active: [false, true, true, true, true],
  },
  {
    title: "공간 네이밍 (일반 강의실)",
    active: [false, false, true, false, false],
  },
  {
    title: "공간 네이밍 (주요 공간)",
    active: [false, false, false, true, true],
  },
  {
    title: "발전재단 예우*",
    active: [true, true, true, true, true],
  },
];

export default function DonationBenefits() {
  return (
    <section className="mx-auto mt-24 max-w-[1200px]">
      <div className="mb-10">
        <h2 className="font-display text-3xl ">
          기부자 혜택
        </h2>
      </div>

      <div className="border-t border-black">
        {/* header */}
        <div className="grid grid-cols-[2.2fr_repeat(5,1fr)] border-b border-black">
          <div />

          {columns.map((column) => (
            <div
              key={column}
              className="py-7 text-center text-lg"
            >
              {column}
            </div>
          ))}
        </div>

        {/* rows */}
        {rows.map((row) => (
          <div
            key={row.title}
            className="grid grid-cols-[2.2fr_repeat(5,1fr)] border-b border-black"
          >
            <div className="flex items-center py-6 pr-6 text-xl leading-tight">
              {row.title}
            </div>

            {row.active.map((active, index) => (
              <div
                key={index}
                className="flex items-center justify-center"
              >
                {active && (
                  <div className="h-5 w-5 rounded-full bg-[#ff5a00]" />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-10">   * 서울대학교 발전재단에서 제공하는 기부자 예우프로그램(서울대병원 이용편의 / 추모 / 동물병원 이용편의 / 감사 선물 및 간행물 제공 / 교내 주요 행사 특별 초청 / 기부자 명예 헌정 / 학교시설이용혜택)을 기준에 따라 제공받게 됩니다.</div>
    
    </section>
  );
}