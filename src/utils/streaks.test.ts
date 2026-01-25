import { describe, it, expect } from "vitest";
import { computeSubjectStreak } from "./streaks";

const subjectId = "math";

function session(dayOffset: number) {
  const d = new Date();
  d.setDate(d.getDate() - dayOffset);
  return {
    type: "focus",
    duration: 25,
    subjectId,
    completedAtIST: d.toISOString(),
  } as any;
}

describe("computeSubjectStreak", () => {
  it("returns 0 if no focus today", () => {
    const sessions = [session(1)];
    expect(computeSubjectStreak(subjectId, sessions)).toBe(0);
  });

  it("counts consecutive days correctly", () => {
    const sessions = [session(0), session(1), session(2)];
    expect(computeSubjectStreak(subjectId, sessions)).toBe(3);
  });

  it("breaks streak on missing day", () => {
    const sessions = [session(0), session(2)];
    expect(computeSubjectStreak(subjectId, sessions)).toBe(1);
  });
});
