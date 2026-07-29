import { FINE_PER_DAY } from "../constants/borrow.constants";

export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const calculateFine = (
  dueAt: Date,
  returnedAt: Date
): number => {
  if (returnedAt <= dueAt) {
    return 0;
  }

  const diffMs = returnedAt.getTime() - dueAt.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  return diffDays * FINE_PER_DAY;
};