import Papa from "papaparse";

export type Donor = {
  id: string;
  display_name: string;
  amount: number;
  message: string;
  pattern_key: string;
  is_visible: boolean;
};

export type Seat = {
  id: string;
  row_label: string;
  seat_number: number;
  status: "available" | "reserved" | "confirmed";
  display_name: string;
  message: string;
  is_visible: boolean;
};

function toBoolean(value: string) {
  return value?.toUpperCase() === "TRUE";
}

export async function fetchCsv<T>(url: string): Promise<T[]> {
  console.log("FETCH URL:", url);

  try {
    const res = await fetch(url, {
      cache: "no-store",
    });

    console.log("FETCH STATUS:", res.status);

    const text = await res.text();
    console.log("CSV TEXT:", text.slice(0, 300));

    const parsed = Papa.parse<Record<string, string>>(text, {
      header: true,
      skipEmptyLines: true,
    });

    console.log("PARSED:", parsed.data);

    return parsed.data as T[];
  } catch (error) {
    console.error("CSV FETCH ERROR:", error);
    return [];
  }
}

export async function getDonors(): Promise<Donor[]> {
  const url = process.env.NEXT_PUBLIC_DONORS_CSV_URL;
  console.log("1");
  if (!url) return [];

  const rows = await fetchCsv<Record<string, string>>(url);
  console.log("2");
  console.log("DONOR ROWS:", rows);

return rows
  .filter((row) => row.id && row.id.trim() !== "")
  .filter((row) => toBoolean(row.is_visible))
  .map((row) => ({
    id: row.id.trim(),
    display_name: row.display_name,
    amount: Number(row.amount),
    message: row.message,
    pattern_key: row.pattern_key,
    is_visible: toBoolean(row.is_visible),
  }));
}

export async function getSeats(): Promise<Seat[]> {
  const url = process.env.NEXT_PUBLIC_SEATS_CSV_URL;

  if (!url) return [];

  const rows = await fetchCsv<Record<string, string>>(url);

  console.log("SEAT ROWS:", rows);

return rows
  .filter((row) => row.id && row.id.trim() !== "")
  .filter((row) => toBoolean(row.is_visible))
  .map((row) => ({
    id: row.id.trim(),
    row_label: row.row_label,
    seat_number: Number(row.seat_number),
    status: row.status as Seat["status"],
    display_name: row.display_name,
    message: row.message,
    is_visible: toBoolean(row.is_visible),
  }));
}