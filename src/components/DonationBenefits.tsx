const columns = [
  "1백만원",
  "1백만원",
  "1/3/5천만원",
  "1억원 이상",
  "3억원 이상",
  "10억원 이상",
];

const rows = [
  {
    title: "디지털 도너월 네이밍 기부",
    active: [true, false, false, false, false, false],
  },
  {
    title: "대형강의홀 좌석 명패",
    active: [false, true, false, false, false, false],
  },
  {
    title: "도너스텝 네이밍 기부",
    active: [false, false, true, false, false, false],
  },
  {
    title: "도너월 네이밍 기부",
    active: [false, false, true, true, true, true],
  },
  {
    title: "공간 네이밍 (일반 강의실)",
    active: [false, false, false, true, false, false],
  },
  {
    title: "공간 네이밍 (주요 공간)",
    active: [false, false, false, false, true, true],
  },
  {
    title: "발전재단 예우*",
    texts: [
      "SNU\nSponser",
       "SNU\nSponser",
       "SNU\nSponser",
       "SNU\nHonor",
      "SNU\nHonor",
      "SNU\nGold Honor",
    ],
  },
];

export default function DonationBenefits() {
  return (
    <section className="mx-auto mt-24 max-w-[1200px] px-5 md:px-0">
      <div className="mb-10">
        <h2 className="font-display text-3xl">
          기부자 혜택
        </h2>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[820px] border-t border-black md:min-w-0">
          {/* header */}
          <div className="grid grid-cols-[2.2fr_repeat(6,1fr)] border-b border-black">
            <div />

            {columns.map((column, index) => (
              <div
                key={`${column}-${index}`}
                className="flex items-center justify-center px-2 py-7 text-center text-xs leading-tight md:text-base"
              >
                {column}
              </div>
            ))}
          </div>

          {/* rows */}
          {rows.map((row) => (
            <div
              key={row.title}
              className="grid grid-cols-[2.2fr_repeat(6,1fr)] border-b border-black"
            >
              <div className="flex items-center py-6 pr-6 text-xs leading-tight md:text-lg">
                {row.title}
              </div>

              {columns.map((_, index) => {
                const active = row.active?.[index];
                const text = row.texts?.[index];

                return (
                  <div
                    key={index}
                    className="flex min-h-[72px] items-center justify-center px-2 text-center"
                  >
                    {text ? (
                      <span className="whitespace-pre-line text-[10px] leading-snug md:text-sm">
                        {text}
                      </span>
                    ) : active ? (
                      <div className="h-4 w-4 rounded-full bg-[#ff5a00] md:h-5 md:w-5" />
                    ) : null}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 text-sm leading-relaxed md:text-base">
        * 서울대학교 발전재단에서 제공하는 기부자 예우프로그램
        &#40;서울대병원 이용편의 / 추모 / 동물병원 이용편의 /
        감사 선물 및 간행물 제공 / 교내 주요 행사 특별 초청 /
        기부자 명예 헌정 / 학교시설이용혜택&#41;을 기준에 따라
        제공받게 됩니다.
      </div>
    </section>
  );
}