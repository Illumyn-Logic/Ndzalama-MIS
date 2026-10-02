'use client';

export function PrintButton() {
  return <button type="button" onClick={() => window.print()} className="rounded-md bg-[#006600] px-4 py-2 text-sm font-semibold text-white print:hidden">Print / Save as PDF</button>;
}