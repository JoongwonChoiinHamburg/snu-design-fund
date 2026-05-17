import { Donor } from "@/lib/csv";

type Props = {
  donors: Donor[];
};

const GOAL_AMOUNT = 3_000_000_000;

const GROUPS = [
  {
    label: "100만원 이상",
    color: "bg-[var(--color-orange)]",
    min: 1_000_000,
    max: 5_000_000,
  },
  {
    label: "500만원 이상",
    color: "bg-[#ffc247]",
    min: 5_000_000,
    max: 20_000_000,
  },
  {
    label: "2000만원 이상",
    color: "bg-[#2632ff]",
    min: 20_000_000,
    max: 50_000_000,
  },
  {
    label: "5000만원 이상",
    color: "bg-[#5d5358]",
    min: 50_000_000,
    max: 300_000_000,
  },
  {
    label: "3억원 이상",
    color: "bg-[#ff4f8b]",
    min: 300_000_000,
    max: Infinity,
  },
];

export default function FundProgressBar({ donors }: Props) {
const totalAmount = donors.reduce((sum, donor) => {
  const amount = Number(donor.amount) || 0;
  return sum + amount;
}, 0);

  const percent = Math.min(
    (totalAmount / GOAL_AMOUNT) * 100,
    100
  );

const segments = GROUPS.map((group) => {
  const amount = donors
    .filter((donor) => {
      const amount = Number(donor.amount) || 0;

      return (
        amount >= group.min &&
        amount < group.max
      );
    })
    .reduce((sum, donor) => {
      const amount = Number(donor.amount) || 0;
      return sum + amount;
    }, 0);

  return {
    ...group,
    amount,
    width: (amount / GOAL_AMOUNT) * 100,
  };
}).filter((segment) => segment.amount > 0);

  return (
    <section className="mx-auto my-auto bg-[var(--color-cream)] px-6 pt-10">
      <div className="mx-auto w-full max-w-[1500px] pb-30">
        <div className="mx-auto h-5 w-full max-w-[1500px] bg-white">
          <div className="flex h-full overflow-hidden">
            {segments.map((segment) => (
              <div
                key={segment.label}
                className={`h-full ${segment.color}`}
                style={{ width: `${segment.width}%` }}
                title={`${segment.label}: ${segment.amount.toLocaleString()}원`}
              />
            ))}
          </div>
        </div>

        <div className="mt-2 flex justify-end text-lg font-medium">
          <span>
            목표 3,000,000,000원 대비{" "}
            <strong>{percent.toFixed(1)}%</strong>
          </span>
        </div>
      </div>
    </section>
  );
}