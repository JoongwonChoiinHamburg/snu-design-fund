"use client";

import { useState } from "react";
import { Seat } from "@/lib/csv";
import LayerPopup from "./LayerPopup";

type Props = {
  seats: Seat[];
};

export default function SeatMap({ seats }: Props) {
  const rows = groupByRow(seats);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);

  return (
    <>
      <div className="flex flex-col items-start gap-2">
  {rows.map((row) => (
    <div key={row.label} className="flex items-center gap-2">
      <div className="w-6 text-xs text-gray-500">{row.label}</div>

      <div className="flex gap-1.5">
        {row.seats.map((seat) => (
          <SeatButton
            key={seat.id}
            seat={seat}
            onClick={() => setSelectedSeat(seat)}
          />
        ))}
      </div>
    </div>
  ))}
</div>

      <LayerPopup
        open={!!selectedSeat}
        onClose={() => setSelectedSeat(null)}
      >
        {selectedSeat && (
          <div className="space-y-3 text-sm">
            {selectedSeat.status === "available" && (
              <>
                <h3 className="text-lg font-bold">{selectedSeat.id}</h3>
                <p>이 좌석을 기부하시려면 디자인학부 과사무실로 문의해주세요.</p>
                <div className="rounded bg-gray-100 p-3 text-xs leading-5">
                  <p>이메일: 여기에_과사메일</p>
                  <p>전화: 여기에_전화번호</p>
                </div>
              </>
            )}

            {selectedSeat.status === "reserved" && (
              <>
                <h3 className="text-lg font-bold">{selectedSeat.id}</h3>
                <p>이 좌석은 현재 예약되었습니다.</p>
              </>
            )}

            {selectedSeat.status === "confirmed" && (
              <>
                <h3 className="text-lg font-bold">{selectedSeat.id}</h3>
                <p className="font-semibold">{selectedSeat.display_name}</p>
                {selectedSeat.message && <p>{selectedSeat.message}</p>}
              </>
            )}

            <button
              className="mt-4 w-full rounded bg-black px-4 py-2 text-sm text-white"
              onClick={() => setSelectedSeat(null)}
            >
              닫기
            </button>
          </div>
        )}
      </LayerPopup>
    </>
  );
}
function SeatButton({
  seat,
  onClick,
}: {
  seat: Seat;
  onClick: () => void;
}) {
  return (
    <button
      className={`h-10 w-10 rounded text-xs transition hover:scale-105 ${getColor(
        seat.status
      )}`}
      onClick={onClick}
    >
      {seat.seat_number}
    </button>
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
      return "bg-gray-300 hover:bg-gray-400";
    case "reserved":
      return "bg-yellow-400 hover:bg-yellow-500";
    case "confirmed":
      return "bg-green-500 text-white hover:bg-green-600";
    default:
      return "bg-gray-200";
  }
}