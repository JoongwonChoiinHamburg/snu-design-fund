import { getDonors, getSeats, getSmallDonors } from "@/lib/csv";
import { donorsToBlocks } from "@/lib/pattern";
import DonationWallSlider from "@/components/DonationWallSlider";
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
const smallDonors = await getSmallDonors();
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
    description: "49동 내부와 연결되는 성큰 가든을 조성합니다.",
  },
  {
    image: "/renderings/loby_1.jpg",
    title: "로비",
    description: "개방감 있는 로비를 조성합니다.",
  },
  {
    image: "/renderings/alounge.jpg",
    title: "주출입구 웰컴 라운지",
    description: "49동 주출입구에 붙어있는 휴게공간입니다.",
  },
  {
    image: "/renderings/digitallounge.jpg",
    title: "디지털 스튜디오",
    description: "1층에 위치한 시각디자인전공 학생들의 메인 스튜디오입니다.",
  },
    {
    image: "/renderings/mainhall.jpg",
    title: "중앙 홀",
    description: "디자인연구동의 중앙에 위치한 홀입니다.",
  },
      {
    image: "/renderings/eventlounge.jpg",
    title: "이벤트 라운지",
    description: "지하 1층에 위치한 전시와 이벤트가 열리는 라운지입니다. 대형 LED월이 설치됩니다.",
  },
        {
    image: "/renderings/fablab.jpg",
    title: "FABLAB",
    description: "지하 1층에 위치한 첨단 제작 장비가 구비된 모형제작실입니다.",
  },
          {
    image: "/renderings/physicallounge.jpg",
    title: "피지컬 라운지",
    description: "2층에 위치한 산업디자인전공 학생들의 메인 스튜디오입니다.",
  },
  
            {
    image: "/renderings/lecturehall.jpg",
    title: "대형 강의실",
    description: "100석 규모의 행사, 전시, 강연 등 다양한 용도로 활용 가능한 대형 강의실입니다.",
  },

];

const totalAmount = donors.reduce(
  (sum, donor) => sum + donor.amount,
  0
);

const interviewVideos = [
  {
    title: "김하나 작가 인터뷰",

    coverImage:
      "/interviews/interview-01-cover.jpg",

    interviewImage:
      "/interviews/interview-01.jpg",

    profile: {
      name: "김하나",

      description:
        "2007학번, 미술대학 시각디자인과 전공 / 주식회사 노나메 대표",
      donationAmount: "2억 원",
      quote:
        "저는 뭉근하고 다정한 이야기가 가진 힘을 믿습니다.",
   
      introduction:
        "안녕하세요. 캐릭터와 이모티콘을 만드는 14년 차 작가 김하나입니다.\n" +
        "'노나메(noname)'라는 이름으로 활동하며 사람들의 일상 속 감정과 대화를 더 즐겁고 따뜻하게 만드는 카카오톡 이모티콘을 만들고 있습니다.\n" +
        "자극적인 콘텐츠가 주목받고 부정적인 메시지가 쉽게 번지는 시대지만, 저는 뭉근하고 다정한 이야기가 가진 힘을 믿습니다. 메신저 속 작은 캐릭터 하나, 귀여운 이미지 한 장이 누군가에게는 위로가 되고, 사랑을 전하는 언어가 되며, 평범한 하루를 조금 더 따뜻하고 유쾌하게 만들어 줄 수 있다고 생각합니다.\n" 
    },
    
    qa: [
      {
        q: "기부를 결심하게 된 계기가 있었나요?",
        a:
          "빚을 갚았습니다.\n\n 학부 시절, 저는 저소득층 학생을 위한 장학금 덕분에 무사히 학업을 마칠 수 있었습니다. 지금의 저에게는 크지 않은 금액일지 모르지만, 당시 대학생 김하나에게 그 장학금은 삶을 지탱하고 세상을 버텨낼 수 있게 해준 소중한 힘이었습니다.\n\n 돌이켜보면 저는 많은 분들의 선의와 도움 덕분에 지금의 자리에 설 수 있었습니다. 그래서 언젠가 그 마음을 꼭 다시 돌려주고 싶다는 생각을 오래도록 품고 살아왔습니다.\n\n 이번 기부는 어쩌면 오랫동안 마음속에 남아 있던 빚을 조금이나마 갚는 일인지도 모르겠습니다. 제가 세상으로부터 받았던 따뜻한 기회와 응원이 또 다른 누군가에게 전해져, 그 사람의 오늘을 지켜주는 힘이 되기를 바랍니다.",
      },
      {
        q: "후배 디자이너들에게 전하고 싶은 말이 있다면요?",
        a:
          "2007년에 입학해 신입생들 모두가 모인 자리에서 곧 퇴임을 앞두고 계시던 한 교수님께서 신입생들에게 해주신 말씀이 아직도 기억에 남습니다.\n\n 학교 안에서 배우는 지식보다 지금 옆자리에 앉아 있는 동기들, 그리고 선후배들을 통해 배우는 것이 더 많을 것입니다.\n\n시간이 흐른 지금 돌아보니 정말 맞는 말씀이었습니다. 뛰어난 친구들이 모여 함께 배우고 성장하는 과정에서 젊음은 부딪히고, 꿈이 큰 만큼 시련과 좌절도 찾아 올 겁니다.\n\n하지만 그 과정 속에서도 쉽게 미워하기보다 포용하고, 무시하기보다 이해하며, 선의의 경쟁을 통해 같이 나아갈 수 있는 힘과 지성을 키워가셨으면 합니다. 서로의 다름을 존중하고 함께 성장하는 경험은 학교에서 얻을 수 있는 가장 소중한 배움 중 하나이기 때문입니다.",
      },
      {
        q: "새롭게 바뀔 49동이 어떤 공간이 되기를 바라시나요?",
        a:
          "제게 49동은 인생에서 가장 치열하고 서툴렀지만, 그만큼 온전히 스스로에게 몰입했던 시간들이 고스란히 남아 있는 공간입니다. 누군가 가져다 놓은 간이침대에서 밤을 지새우기도 했고, 과방에 모여 새벽까지 과제와 씨름하기도 했습니다. 지금 생각해보면 그 모든 순간은 디자이너를 꿈꾸던 학생들만이 누릴 수 있었던 특별한 낭만이었습니다.\n\n새롭게 바뀔 49동 역시 지금의 학생들에게 치열한 도전과 깊은 고민이 켜켜이 쌓이는 공간이 되기를 바랍니다. 또한 그 안에서 많은 학생들이 서로에게 힘이 되어 주며 함께 배우고 성장하고, 동기와 선후배들과 잊지 못할 추억을 만들어 가기를 진심으로 응원합니다.\n\n언젠가 후배님들도 49동을 떠올렸을 때, 자신의 가장 빛나고 뜨거웠던 청춘의 한 페이지를 떠올릴 수 있기를 바랍니다.",
      },
    ],
  },

  {
    title: "김권봉 대표 인터뷰",

    coverImage:
      "/interviews/interview-02-cover.jpg",

    interviewImage:
      "/interviews/interview-02-cover.jpg",
      
    profile: {
      name: "김권봉",

      description:
        "2007학번, 미술대학 시각디자인과 전공 / 주식회사 모트모트 대표",

      donationAmount: "3억 원",

      quote:
        "여기에 한 줄 인용",

      introduction:
        "여기에 소개글"
    },

    qa: [
      {
        q: "질문 1",
        a: "답변 1",
      },
      {
        q: "질문 2",
        a: "답변 2",
      },
      {
        q: "질문 3",
        a: "답변 3",
      },
    ],
  },
];



  return (
    <main className="min-h-screen bg-white px-0 text-[var(--color-grey)]">
  <section className="mx-auto ">
<section
  className="
    mx-auto
    flex
    max-w-[1200px]
    flex-col
    items-start
    gap-6
    px-6
    pt-6
    pb-3

    md:flex-row
    md:items-start
    md:justify-between
    md:gap-10
    md:px-0
    md:pt-20
    md:pb-10
  "
>
  {/* mobile top / desktop right */}
{/* mobile logo */}
<img
  src="/imgs/logo_hori.svg"
  alt="서울대학교 디자인학부"
  className="
    order-1
    block
    w-[500px]
    shrink-0
    ml-0
    md:hidden
  "
/>

{/* desktop logo */}
<img
  src="/imgs/logo.svg"
  alt="서울대학교 디자인학부"
  className="
    order-1
    hidden
    w-[240px]
    shrink-0

    md:order-2
    md:block
  "
/>

  {/* title */}
  <div className="order-2 md:order-1">
    <h1
  className="
    font-display
    whitespace-nowrap
    text-[clamp(14px,4.1vw,20px)]
    leading-snug

    md:whitespace-normal
    md:text-5xl
    md:leading-relaxed
  "
>
      미래 디자이너를 위한 창의환경 조성기금
    </h1>

    <h3 className="mt-1 mb-3 text-sm md:mt-5 md:mb-8 md:text-2xl">
      미래 디자이너의 탐험 공간,
      여러분과 함께 만들어갑니다.
    </h3>
  </div>
</section>
</section>
<section className="flex min-h-[80dvh] flex-col bg-[var(--color-cream)] md:min-h-0">
  <div className="flex-1">
    <DonationWallSlider blocks={blocks} />

    <FundProgressBar
  donors={donors}
  smallDonors={smallDonors}
/>
  </div>
</section>

      <section className="mx-auto text-lg px-5 md:px-0 max-w-[1200px]">
        <section>
<h2 className="font-display text-2xl mt-15 leading-relaxed  text-left md:text-4xl md:mt-30 ">
  좋은 디자이너가 되기 위해서는{" "} <br className="md:hidden" />
  <span className="pattern-highlight-4" >
    오래 고민하고
  </span>
  ,{" "}
  <span className="pattern-highlight-3" >
    여러 번 만들어보고
  </span>
  ,
<br className="hidden md:block" />
  때로는{" "}
  <span className="pattern-highlight-2">
    실패한 것을 다시 꺼내보는 시간
  </span>
  이 쌓여야 합니다.
  <br />
  그 시간을 가능하게 하는 것은, <br className="md:hidden" />결국 새로운 시도를 이어갈 수 있는
  <br />
  <span className="pattern-highlight-1" >
    ‘탐험의 환경’
  </span>
  입니다.
</h2>
        </section>
<section className="relative mt-12 grid gap-0 md:grid-cols-3 md:gap-0">
  <div className="relative z-30 w-80 border border-black bg-white p-7 leading-relaxed md:w-100 shadow-sm md:p-10 md:translate-x-4 md:translate-y-6">
    <strong>
      서울대학교 디자인과의 보금자리, 49동이 리모델링을 통해
      새롭게 거듭나고자 합니다.
    </strong>
    <br />
    <br />
    디자인 교육이 변화하는 지금,
    학생들이 오래 머물며 더 깊이 탐구하고 자유롭게 새로운
    시도를 이어갈 수 있는 공간을 만들고자 합니다.
  </div>

  <div className="relative z-20 -mt-4 ml-6 border border-black bg-white p-7 leading-relaxed shadow-sm md:ml-0 md:mt-0 md:p-10 md:-translate-x-2 md:-translate-y-2">
    후원금은 창의적 실험과 협업이 가능한 공간,
    손에 닿는 가구와 작업 인프라, 결과를 공유하는 전시 시스템,
    미래를 탐구하는 첨단 기자재, 그리고 공간을 살아 움직이게 하는
    창의 프로그램에 사용됩니다.
  </div>

  <div className="relative z-10 -mt-4 mr-6 border border-black bg-white p-7 leading-relaxed shadow-sm md:mr-0 md:mt-0 md:p-10 md:-translate-x-8 md:translate-y-10">
    미래의 디자이너가 새로운 가능성을 만들어낼 때,
    그 시작에는 오늘 함께해 주신 여러분의 마음이 깊이 남아 있을 것입니다.
    <br />
    <br />
    이 새로운 변화를 함께해 주시기를 부탁드립니다.
  </div>
</section>

    </section>

<section className="mx-auto mt-40 max-w-[1200px]">
  <h2 className="p-5 mb-0 font-display text-3xl md:mb-8 mb:p-0 leading-relaxed lg:px-0">
    서울대학교 디자인과의<br className="md:hidden" /> "탐험의 환경"이 새롭게 <br className="md:hidden" />조성됩니다.
  </h2>

<RenderingSlider slides={renderSlides} />
</section>

<section className="mx-auto mt-40 max-w-[1200px]">
  
  <h2 className="px-5 mb-8 font-display text-3xl lg:px-0">
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
