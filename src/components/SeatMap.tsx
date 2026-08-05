"use client";

import { Seat } from "@/lib/csv";

type Props = {
  seats: Seat[];
  onSeatClick?: (seat: Seat) => void;
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

export default function SeatMap({
  seats,
  onSeatClick,
}: Props) {
  const rows = groupByRow(seats);
const maxSeatsPerRow = Math.max(
  0,
  ...rows.map((row) => row.seats.length)
);
  return (
    <div className="space-y-10 ">


      <section>
        <div className="mb-5 flex items-center justify-between gap-4">
 <h3 className="mb-5 font-bold text-xl">
            좌석 현황
          </h3>

          <div className="flex gap-4 text-[var(--color-grey)]/60">
            <Legend color="bg-gray-300" label="선택 가능" />
            <Legend color="bg-yellow-400" label="예약" />
            <Legend color="bg-green-500" label="확정" />
            <Legend color="bg-gray-500" label="불가능" />
          </div>
        </div>

      <div className="flex w-full flex-col items-center gap-1.5 pb-16 md:gap-2 md:pb-30">
  {rows.map((row) => (
    <div
      key={row.label}
      className="flex w-full items-center gap-1 md:gap-2"
    >
      <div className="w-4 shrink-0 text-[10px] text-gray-500 md:w-6 md:text-xs">
        {row.label}
      </div>

      <div
        className="grid flex-1 gap-0.5 md:gap-1.5"
        style={{
          gridTemplateColumns: `repeat(${maxSeatsPerRow}, minmax(0, 1fr))`,
        }}
      >
        {row.seats.map((seat) => (
          <SeatButton
            key={seat.id}
            seat={seat}
             onSeatClick={onSeatClick}
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

function SeatButton({
  seat,
  onSeatClick,
}: {
  seat: Seat;
  onSeatClick?: (seat: Seat) => void;
}) {
  const hasPopupContent =
    !!seat.display_name || !!seat.message;

  function openSeat() {
    if (!hasPopupContent) return;
    onSeatClick?.(seat);
  }

  return (
    <button
      type="button"
      onClick={openSeat}
  onTouchEnd={(event) => {
  event.preventDefault();
  openSeat();
}}
      className={`
        flex
        aspect-square
        w-full
        items-center
        justify-center
        rounded-sm
        text-[8px]
        leading-none
        transition
        touch-manipulation
        select-none

        md:rounded
        md:text-xs

        ${getColor(seat.status)}

        ${
          hasPopupContent
            ? "cursor-pointer hover:scale-110 hover:shadow-[0_0_0_2px_#000]"
            : "cursor-default"
        }
      `}
      title={seat.id}
      aria-label={`${seat.row_label}열 ${seat.seat_number}번 좌석`}
    >
      {seat.seat_number}
    </button>
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
      return "bg-gray-300 text-[var(--color-grey)]";
    case "reserved":
      return "bg-yellow-400 text-[var(--color-grey)]";
    case "confirmed":
      return "bg-green-500 text-white";
        case "unavailable":
      return "bg-gray-500 text-white";
    default:
      return "bg-gray-200 text-[var(--color-grey)]";
  }
}