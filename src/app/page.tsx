import { getDonors, getSeats } from "@/lib/csv";
import { donorsToBlocks } from "@/lib/pattern";
import PatternWall from "@/components/PatternWall";
import SeatMap from "@/components/SeatMap";

export default async function Home() {
  const donors = await getDonors();
  const seats = await getSeats();
  const blocks = donorsToBlocks(donors);

  return (
    <main className="min-h-screen bg-white px-6 py-10 text-black">
      <section className="mx-auto max-w-[1200px]">
        <h1 className="mb-8 text-3xl font-bold">
          서울대학교 디자인학부 발전기금
        </h1>

        <PatternWall blocks={blocks} />
      </section>

      <section className="mx-auto mt-24 max-w-[1200px]">
        <h2 className="mb-8 text-2xl font-bold">좌석 기부</h2>

        <SeatMap seats={seats} />
      </section>
    </main>
  );
}