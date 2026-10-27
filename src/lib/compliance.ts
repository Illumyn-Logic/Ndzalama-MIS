import type { AssessorRegistry } from '@prisma/client';

export function isRegistrationValid(
  registration: Pick<AssessorRegistry, 'expiryDate'>,
  date: Date = new Date(),
): boolean {
  return registration.expiryDate.getTime() >= date.getTime();
}
