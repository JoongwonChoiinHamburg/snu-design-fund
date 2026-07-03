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
            서울대학교 디자인학부
            <br />
            49동 리모델링 및 창의환경 조성 프로젝트
          </p>

          <p>
            후원 및 기부 문의
            <br />
            design@snu.ac.kr
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