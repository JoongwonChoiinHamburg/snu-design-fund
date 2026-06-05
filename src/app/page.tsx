import { getDonors, getSeats } from "@/lib/csv";
import { donorsToBlocks } from "@/lib/pattern";
import PatternWall from "@/components/PatternWall";
import SeatMap from "@/components/SeatMap";
import RenderingSlider from "@/components/RenderingSlider";
import VideoGrid from "@/components/VideoGrid";
import DonationPrograms from "@/components/DonationPrograms";
import DonationBenefits from "@/components/DonationBenefits";
import Footer from "@/components/Footer";
import DonateFloatingButton from "@/components/DonateFloatingButton";
import FundProgressBar from "@/components/FundProgressBar";
import AnimatedHighlight from "@/components/AnimatedHighlight";

export default async function Home() {
  const donors = await getDonors();
  const seats = await getSeats();
  const blocks = donorsToBlocks(donors);
const renderSlides = [
  {
    image: "/renderings/outside_1.jpg",
    title: "디자인연구동 외부",
    description: "리모델링된 디자인연구동의 외부 모습입니다.",
  },
    {
    image: "/renderings/outside_2.jpg",
    title: "성큰 가든",
    description: "지하 1층의 디지털라운지와 연결되는 성큰 가든을 조성합니다.",
  },
  {
    image: "/renderings/loby_1.jpg",
    title: "로비",
    description: "개방감 있는 로비를 조성합니다.",
  },
  {
    image: "/renderings/alounge.jpg",
    title: "A라운지",
    description: "로비와 이어지는 개방형 라운지입니다.",
  },
  {
    image: "/renderings/digitallounge.jpg",
    title: "디지털라운지",
    description: "무빙월을 통해 공간의 확장과 분리가 가능한 디지털라운지입니다.",
  },
    {
    image: "/renderings/mainhall.jpg",
    title: "중앙 홀",
    description: "디자인연구동의 중앙에 위치한 홀입니다.",
  },
      {
    image: "/renderings/eventlounge.jpg",
    title: "이벤트라운지",
    description: "전시와 이벤트가 열리는 라운지입니다.",
  },
        {
    image: "/renderings/fablab.jpg",
    title: "FABLAB",
    description: "첨단 제작 장비가 구비된 FABLAB입니다.",
  },
          {
    image: "/renderings/physicallounge.jpg",
    title: "피지컬 라운지",
    description: "피지컬 라운지입니다.",
  },
  
            {
    image: "/renderings/lecturehall.jpg",
    title: "대형 강의실",
    description: "행사, 전시, 강연 등 다양한 용도로 활용 가능한 대형 강의실입니다.",
  },

];

const totalAmount = donors.reduce(
  (sum, donor) => sum + donor.amount,
  0
);

const interviewVideos = [
  {
    title: "김하나 동문 인터뷰",

    coverImage:
      "/interviews/interview-01-cover.jpg",

    interviewImage:
      "/interviews/interview-01.jpg",

    profile: {
      name: "김하나",

      description:
        "2007학번, 미술대학 시각디자인과 전공 / 노나메 스튜디오 대표",

      quote:
        "49동이 재탄생하는데 제가 힘을 보탤 수 있다는 것에 뿌듯함을 느낍니다.",
    },

qa: [
  {
    q: "49동 리모델링이 필요한 이유는 무엇인가요?",
    a:
      "49동은 저에게 단순한 수업 공간이라기보다, 오래 머물며 생각하고 만들던 장소로 기억됩니다.\n" +
      "디자인을 배운다는 것은 책상 앞에서만 이루어지는 일이 아니라, 친구들과 이야기하고, 실패한 작업을 다시 펼쳐보고, 밤늦게까지 손으로 무언가를 만드는 시간을 포함한다고 생각합니다.\n" +
      "그런 시간이 쌓이려면 학생들이 자연스럽게 모이고, 머물고, 다시 시도할 수 있는 환경이 필요합니다.\n" +
      "49동 리모델링은 낡은 건물을 새것으로 바꾸는 일을 넘어, 디자인 교육의 리듬을 다시 만드는 일이라고 느낍니다.\n" +
      "학생들이 더 자유롭게 탐험할 수 있는 공간이 생긴다는 점에서 꼭 필요한 변화라고 생각합니다.",
  },
  {
    q: "기부를 결심하게 된 계기가 있었나요?",
    a:
      "처음 소식을 들었을 때는 반가움이 먼저 들었습니다.\n" +
      "제가 공부하던 공간이 다시 살아나고, 다음 세대 학생들에게 더 좋은 환경으로 이어진다는 사실이 기뻤습니다.\n" +
      "학교를 떠난 뒤에도 디자인을 계속하며 느낀 것은, 좋은 시작점이 얼마나 오래 영향을 미치는가 하는 점입니다.\n" +
      "작은 대화, 좋은 책상, 함께 작업하던 친구들, 선생님의 한마디 같은 것들이 시간이 지나도 계속 남아 있습니다.\n" +
      "49동이 재탄생하는 데 제가 조금이나마 힘을 보탤 수 있다는 것에 뿌듯함을 느꼈고, 그래서 자연스럽게 참여하게 되었습니다.",
  },
  {
    q: "기부금이 어떤 방식으로 쓰이기를 기대하시나요?",
    a:
      "가장 바라는 것은 학생들이 오래 머물고 싶어지는 공간이 만들어지는 것입니다.\n" +
      "좋은 의자나 책상, 자유롭게 움직일 수 있는 벽, 함께 모여 이야기할 수 있는 장소는 사소해 보이지만 실제 작업 환경에서는 굉장히 중요합니다.\n" +
      "또 결과물을 보여주고 공유할 수 있는 전시 시스템도 필요하다고 생각합니다.\n" +
      "디자인은 혼자 완성하는 일이기도 하지만, 보여주고 피드백을 받으며 더 단단해지는 일이기도 하니까요.\n" +
      "기부금이 학생들의 실험, 협업, 발표, 휴식이 자연스럽게 이어지는 환경을 만드는 데 쓰이면 좋겠습니다.",
  },
  {
    q: "후배 디자이너들에게 전하고 싶은 말이 있다면요?",
    a:
      "디자인을 공부하는 동안에는 자주 막막하고, 내가 잘하고 있는지 알기 어려운 순간이 많습니다.\n" +
      "그런데 돌이켜보면 그 막막함 속에서 오래 붙잡고 있던 시간들이 결국 자기만의 기준이 되었습니다.\n" +
      "너무 빨리 답을 찾으려 하지 않았으면 좋겠습니다.\n" +
      "여러 번 만들고, 실패한 것을 다시 보고, 친구들과 이야기하면서 생각이 조금씩 바뀌는 과정을 믿어도 좋다고 말해주고 싶습니다.\n" +
      "좋은 디자이너가 되는 일은 단번에 완성되는 것이 아니라, 계속 질문하는 태도 안에서 자라나는 것 같습니다.",
  },
  {
    q: "새롭게 바뀔 49동이 어떤 공간이 되기를 바라시나요?",
    a:
      "학생들이 부담 없이 들어와 오래 머물 수 있는 공간이 되었으면 합니다.\n" +
      "수업을 듣는 장소이면서도, 우연히 누군가의 작업을 보고 이야기를 나누고, 작은 전시가 열리고, 새로운 협업이 시작되는 장소가 되면 좋겠습니다.\n" +
      "디자인과의 공간은 단순히 결과물을 만드는 곳이 아니라 서로의 생각이 오가는 장면을 만들어야 한다고 생각합니다.\n" +
      "49동이 그런 장면들을 더 많이 품는 장소가 되기를 바랍니다.\n" +
      "그리고 시간이 지난 뒤 후배들이 이 공간을 떠올릴 때, 저처럼 ‘그곳에서 많이 배웠다’고 말할 수 있으면 좋겠습니다.",
  },
]
  }
];



  return (
    <main className="min-h-screen bg-white px-0 text-[var(--color-grey)]">
  <section className="mx-auto ">
  <section className="mx-auto flex max-w-[1200px] items-start justify-between gap-10 pt-20 pb-10">
    
    {/* left */}
    <div>
      <h1 className="font-display text-5xl">
        미래 디자이너를 위한 창의환경 조성기금
      </h1>

      <h3 className="mt-5 mb-8 text-2xl">
        미래 디자이너의 탐험 공간,
        여러분과 함께 만들어갑니다.
      </h3>
    </div>

    {/* right */}
<img
  src="/imgs/logo.svg"
  alt="서울대학교 디자인학부"
  className="hidden w-[240px] shrink-0 md:block"
/>
  </section>
</section>
      <section>
        <PatternWall blocks={blocks} />
       <FundProgressBar donors={donors} />
      </section>

      <section className="mx-auto text-lg  max-w-[1200px]">
        <section>
<h2 className="font-display text-4xl text-left mt-30 leading-relaxed">
  좋은 디자이너가 되기 위해서는{" "}
  <span className="pattern-highlight-4" >
    오래 고민하고
  </span>
  ,{" "}
  <span className="pattern-highlight-3" >
    여러 번 만들어보고
  </span>
  ,
  <br />
  때로는{" "}
  <span className="pattern-highlight-2">
    실패한 것을 다시 꺼내보는 시간
  </span>
  이 쌓여야 합니다.
  <br />
  그 시간을 가능하게 하는 것은, 결국 새로운 시도를 이어갈 수 있는
  <br />
  <span className="pattern-highlight-1" >
    ‘탐험의 환경’
  </span>
  입니다.
</h2>
        </section>
<section className="relative mt-12 grid gap-6 md:grid-cols-3 md:gap-0">
  <div className="relative z-30 border border-black bg-white p-10 leading-relaxed shadow-sm md:translate-x-4 md:translate-y-6">
    <strong>서울대학교 디자인과의 보금자리, 49동이 <br></br>리모델링을 통해
    새롭게 거듭나고자 합니다. </strong><br></br><br></br>디자인 교육이 변화하는 지금,
    학생들이 오래 머물며 더 깊이 탐구하고 자유롭게 새로운
    시도를 이어갈 수 있는 공간을 만들고자 합니다.
  </div>

  <div className="relative z-20 border border-black bg-white p-10 leading-relaxed shadow-sm md:-translate-x-2 md:-translate-y-2">
    후원금은 창의적 실험과 협업이 가능한 공간,
    손에 닿는 가구와 작업 인프라, 결과를 공유하는 전시 시스템,
    미래를 탐구하는 첨단 기자재, 그리고 공간을 살아 움직이게 하는
    창의 프로그램에 사용됩니다.
  </div>

  <div className="relative z-10  border border-black bg-white p-10 leading-relaxed shadow-sm md:-translate-x-8 md:translate-y-10">
    미래의 디자이너가 새로운 가능성을 만들어낼 때,
    그 시작에는 오늘 함께해 주신 여러분의 마음이 깊이 남아 있을 것입니다.<br></br><br></br>
    이 새로운 변화를 함께해 주시기를 부탁드립니다.
  </div>
</section>

    </section>

<section className="mx-auto mt-40 max-w-[1200px]">
  <h2 className="mb-8 font-display text-3xl ">
    서울대학교 디자인과의 "탐험의 환경"이 새롭게 조성됩니다.
  </h2>

<RenderingSlider slides={renderSlides} />
</section>

<section className="mx-auto mt-40 max-w-[1200px]">
  
  <h2 className="mb-8 font-display text-3xl ">
    기부자 스토리
  </h2>

    <VideoGrid videos={interviewVideos} />
</section>
<DonationPrograms seats={seats} />
<DonationBenefits />
<Footer />
<DonateFloatingButton />
    </main>
  );
}