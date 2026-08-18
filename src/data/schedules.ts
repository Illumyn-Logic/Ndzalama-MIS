export interface Schedule {
  id: number;
  courseId: number;
  startDate: string;
  endDate: string;
  location: string;
  capacity: number;
}

export const schedules: Schedule[] = [
  { id: 1, courseId: 1, startDate: '2026-09-08', endDate: '2026-09-12', location: 'Tzaneen', capacity: 20 },
  { id: 2, courseId: 1, startDate: '2026-10-12', endDate: '2026-10-16', location: 'Polokwane', capacity: 15 },
  { id: 3, courseId: 2, startDate: '2026-09-15', endDate: '2026-09-18', location: 'Tzaneen', capacity: 20 },
  { id: 4, courseId: 2, startDate: '2026-10-19', endDate: '2026-10-22', location: 'Johannesburg', capacity: 20 },
  { id: 5, courseId: 3, startDate: '2026-09-22', endDate: '2026-09-25', location: 'Tzaneen', capacity: 20 },
  { id: 6, courseId: 4, startDate: '2026-10-05', endDate: '2026-10-09', location: 'Polokwane', capacity: 20 },
  { id: 7, courseId: 5, startDate: '2027-02-01', endDate: '2027-11-30', location: 'Tzaneen', capacity: 25 },
  { id: 8, courseId: 6, startDate: '2026-09-01', endDate: '2027-02-28', location: 'Tzaneen', capacity: 30 },
];
