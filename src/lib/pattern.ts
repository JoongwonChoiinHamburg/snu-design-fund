import { Donor } from "@/lib/csv";

export type BlockSize = 1 | 2 | 3 | 4 | 6 | 8;

export type DonorBlock = {
  id: string;
  displayName: string;
  amount: number;
  message: string;
  size: BlockSize;
  area: number;
  patternKey: string;
};

const PATTERNS = [
  "red-01",
  "red-02",
  "red-03",
  "red-04",
  "blue-01",
  "blue-02",
  "blue-03",
  "blue-04",
  "pink-01",
  "pink-02",
  "pink-03",
  "pink-04",
  "yellow-01",
  "yellow-02",
  "yellow-03",
  "yellow-04",
];

export function amountToSize(amount: number): BlockSize {
  // 3억원 이상 → 8×8
  if (amount >= 300_000_000) return 8;

  // 1억원 이상 → 6×6
  if (amount >= 100_000_000) return 6;

  // 5000만원 이상 → 4×4
  if (amount >= 50_000_000) return 4;

  // 2000만원 이상 → 3×3
  if (amount >= 20_000_000) return 3;

  // 500만원 이상 → 2×2
  if (amount >= 5_000_000) return 2;

  // 100만원 이상 → 1×1
  return 1;
}

export function amountToArea(amount: number) {
  const size = amountToSize(amount);
  return size * size;
}

export function getStablePattern(id: string, patternKey?: string) {
  if (patternKey && patternKey !== "auto") {
    return patternKey.trim();
  }

  const index =
    id.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0) %
    PATTERNS.length;

  return PATTERNS[index];
}

export function donorsToBlocks(donors: Donor[]): DonorBlock[] {
  return donors.map((donor) => {
    const size = amountToSize(donor.amount);

    return {
      id: donor.id,
      displayName: donor.display_name,
      amount: donor.amount,
      message: donor.message,
      size,
      area: size * size,
      patternKey: getStablePattern(donor.id, donor.pattern_key),
    };
  });
}

export function getZoom(blocks: DonorBlock[]) {
  const totalArea = blocks.reduce((sum, block) => sum + block.area, 0);

  if (totalArea < 80) return 4;
  if (totalArea < 240) return 2;
  return 1;
}