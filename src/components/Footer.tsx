export default function Footer() {
  return (
    <footer className="mt-32 bg-[#f5f5f5] ">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-6 py-10 md:grid-cols-3">
        {/* left */}
        <div>
          <h2 className="font-display text-lg font-bold">
            미래디자이너를 위한
            <br />
            창의환경 조성기금
          </h2>
        </div>

        {/* center */}
        <div className="space-y-3 text-sm leading-relaxed text-[var(--color-grey)]/70">
          <p>
            서울대학교 디자인과
            <br />
            49동 리모델링 및 창의환경 조성 프로젝트
          </p>

          <p>
            후원 및 기부 문의
            <br />
            서울특별시 관악구 관악로 1 서울대학교 50동 2층
            <br />
            미술대학 행정실 이수현 주무관 / 02 880 7453 / @snu.ac.kr
          </p>
            
          <p>
            서울특별시 관악구 관악로 1 서울대학교 74동 2층
            <br />
            디자인과 사무실 김민철 조교 / 02 880 7512 / design@snu.ac.kr
          </p>
        </div>

        {/* right */}
        <div className="space-y-3 text-sm leading-relaxed text-[var(--color-grey)]/70">
          <p>
            © 2026 Seoul National University
            Department of Design
          </p>

          <p>
            Site Design & Development
            <br />
            Pikant
          </p>
        </div>
      </div>
    </footer>
  );
}
