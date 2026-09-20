import { prisma } from "@/lib/prisma";

export async function generateStudentNumber(year: number = new Date().getFullYear()): Promise<string> {
  // Use a transaction to prevent race conditions if two learners register simultaneously
  return await prisma.$transaction(async (tx) => {
    // Find the highest student number for the current year
    const lastLearner = await tx.profile.findFirst({
      where: {
        studentNumber: { startsWith: year.toString() }
      },
      orderBy: { studentNumber: 'desc' },
      select: { studentNumber: true }
    });

    let nextSequence = 1;
    if (lastLearner?.studentNumber) {
      // Extract the sequence part (e.g., "00123" from "202600123") and increment
      const lastSeq = parseInt(lastLearner.studentNumber.substring(4), 10);
      nextSequence = lastSeq + 1;
    }

    // Format: 2026 + 00001
    return `${year}${nextSequence.toString().padStart(5, '0')}`;
  });
}