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
        <h1 className="font-display text-3xl font-bold">
          미래디자이너를 위한 창의환경 조성기금
        </h1>
        <h3 className="mb-8 text-1xl">
          미래 디자이너의 탐험 공간, 여러분과 함께 만들어갑니다.
        </h3>

        <PatternWall blocks={blocks} />
      </section>


      <section className="mx-auto text-lg p-10 max-w-[1200px]">
        <section>
          <h2 className="font-display text-2xl font-bold">   좋은 디자이너가 되기 위해서는 오래 고민하고, 여러 번 만들어 보고, 때로는 실패한 것을 다시 꺼내보는 시간이 쌓여야 합니다. 그 시간을 가능하게 하는 것은, 결국 새로운 시도를 이어갈 수 있는 ‘탐험의 환경’입니다.</h2>
        </section>
           <section className="mt-10">
            서울대학교 디자인과의 보금자리, 49동이 리모델링을 통해 새롭게 거듭나고자 합니다. 디자인 교육이 변화하는 지금, 학생들이 오래 머물며 더 깊이 탐구하고 자유롭게 새로운 시도를 이어갈 수 있는 공간을 만들고자 합니다.
    후원금은 창의적 실험과 협업이 가능한 공간, 손에 닿는 가구와 작업 인프라, 결과를 공유하는 전시 시스템, 미래를 탐구하는 첨단 기자재, 그리고 공간을 살아 움직이게 하는 창의 프로그램에 사용됩니다.
미래의 디자이너가 새로운 가능성을 만들어낼 때, 그 시작에는 오늘 함께해 주신 여러분의 마음이 깊이 남아 있을 것입니다. 이 새로운 변화를 함께해 주시기를 부탁드립니다.
           </section>

    </section>



      <section className="mx-auto mt-24 max-w-[1200px]">
        <h2 className="mb-8 text-2xl font-bold">좌석 기부</h2>

        <SeatMap seats={seats} />
      </section>
    </main>
  );
}