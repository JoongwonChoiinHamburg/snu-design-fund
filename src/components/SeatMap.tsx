"use client";

import { Seat } from "@/lib/csv";

type Props = {
  seats: Seat[];
};

const STEPS = [
  {
    title: "좌석 기부 신청",
    description:
      "좌석 배치도를 확인한 뒤 희망 좌석을 정해 디자인학부 과사무실로 문의합니다.\n신청이 접수되면 해당 좌석은 예약 상태로 표시됩니다.",
  },
  {
    title: "기부금 납입 및 명패 설치",
    description:
      "서울대학교 발전재단을 통해 기부금을 납입합니다.\n기부 확인 후 좌석 명패 문구를 확정하고 제작·설치가 진행됩니다.",
  },
  {
    title: "기부자 예우",
    description:
      "기부가 확정된 좌석은 배치도에 반영되며 기부자 정보가 관리됩니다.\n기부자는 서울대학교 발전재단 기준에 따른 예우를 받게 됩니다.",
  },
];

export default function SeatMap({ seats }: Props) {
  const rows = groupByRow(seats);

  return (
    <div className="space-y-10 ">
      <section>
        <h3 className="mb-5 font-bold text-xl">
          좌석 기부 진행 단계
        </h3>

        <div className="overflow-hidden rounded-2xl border border-black/15 bg-white">
          {STEPS.map((step, index) => (
            <div
              key={step.title}
              className="grid gap-4 border-b border-black/10 p-5 last:border-b-0 md:grid-cols-[120px_1fr]"
            >
              <div className="font-display text-lg">
                {index + 1}
              </div>

              <div>
                <h4 className="text-lg font-semibold">
                  {step.title}
                </h4>

                <p className="mt-2 whitespace-pre-line leading-relaxed text-black/65">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

          <section>
  <h3 className="mb-5 font-bold text-xl">
    명패 예시
  </h3>

  <div >
    <img
      src="/imgs/plate.png"
      alt="좌석 기부 명패 예시"
      className="mx-auto max-h-[200px] w-full object-contain"
    />
  </div>
</section>

      <section>
        <div className="mb-5 flex items-center justify-between gap-4">
 <h3 className="mb-5 font-bold text-xl">
            좌석 현황
          </h3>

          <div className="flex gap-4 text-xs text-black/60">
            <Legend color="bg-gray-300" label="선택 가능" />
            <Legend color="bg-yellow-400" label="예약" />
            <Legend color="bg-green-500" label="확정" />
          </div>
        </div>

        <div className="pb-30 flex flex-col items-center gap-2">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-center gap-2"
            >
              <div className="w-6 text-xs text-gray-500">
                {row.label}
              </div>

              <div className="flex gap-1.5">
                {row.seats.map((seat) => (
                  <SeatButton
                    key={seat.id}
                    seat={seat}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function SeatButton({ seat }: { seat: Seat }) {
  return (
    <div
      className={`flex h-10 w-10 items-center justify-center rounded text-xs ${getColor(
        seat.status
      )}`}
      title={seat.id}
    >
      {seat.seat_number}
    </div>
  );
}

function Legend({
  color,
  label,
}: {
  color: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={`h-3 w-3 rounded ${color}`} />
      <span>{label}</span>
    </div>
  );
}

function groupByRow(seats: Seat[]) {
  const map: Record<string, Seat[]> = {};

  seats.forEach((seat) => {
    if (!map[seat.row_label]) {
      map[seat.row_label] = [];
    }

    map[seat.row_label].push(seat);
  });

  return Object.entries(map).map(([label, seats]) => ({
    label,
    seats: seats.sort((a, b) => a.seat_number - b.seat_number),
  }));
}

function getColor(status: Seat["status"]) {
  switch (status) {
    case "available":
      return "bg-gray-300 text-black";
    case "reserved":
      return "bg-yellow-400 text-black";
    case "confirmed":
      return "bg-green-500 text-white";
    default:
      return "bg-gray-200 text-black";
  }
}