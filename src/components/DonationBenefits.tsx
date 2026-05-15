const columns = [
  "1백만원 이상",
  "1천만원 이상",
  "1억원 이상",
  "3억원 이상",
];

const rows = [
  {
    title: "강의홀 좌석 명패",
    active: [true, true, true, true],
  },
  {
    title: "공간 네이밍",
    active: [false, false, false, true],
  },
  {
    title: "디자인과 도네이션 월 기재",
    active: [true, true, true, true],
  },
  {
    title: "발전재단 예우",
    active: [true, true, true, true],
  },
];

export default function DonationBenefits() {
  return (
    <section className="mx-auto mt-24 max-w-[980px]">
      <div className="mb-10">
        <h2 className="font-display text-2xl font-bold">
          기부자 혜택
        </h2>
      </div>

      <div className="border-t border-black">
        {/* header */}
        <div className="grid grid-cols-[2.2fr_repeat(4,1fr)] border-b border-black">
          <div />

          {columns.map((column) => (
            <div
              key={column}
              className="py-7 text-center font-display text-lg"
            >
              {column}
            </div>
          ))}
        </div>

        {/* rows */}
        {rows.map((row) => (
          <div
            key={row.title}
            className="grid grid-cols-[2.2fr_repeat(4,1fr)] border-b border-black"
          >
            <div className="flex items-center py-8 pr-8 font-display text-2xl leading-tight">
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
    </section>
  );
}