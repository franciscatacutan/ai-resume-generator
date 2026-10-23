import { careerProfileSchema } from "../schemas/career-profile.schema";
import type { CareerProfile } from "../types/career-profile.types";

const STORAGE_KEY = "ai-resume-generator.career-profile.v1";

export type ProfileLoadResult =
  | { status: "empty" }
  | { status: "loaded"; profile: CareerProfile }
  | { status: "invalid"; message: string }
  | { status: "unavailable"; message: string };

export function loadCareerProfile(): ProfileLoadResult {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (raw === null) {
      return { status: "empty" };
    }

    let parsed: unknown;

    try {
      parsed = JSON.parse(raw);
    } catch {
      return {
        status: "invalid",
        message: "Saved profile data is not valid JSON.",
      };
    }

    const result = careerProfileSchema.safeParse(parsed);

    if (!result.success) {
      return {
        status: "invalid",
        message: "Saved profile data does not match the expected schema.",
      };
    }

    return {
      status: "loaded",
      profile: result.data,
    };
  } catch {
    return {
      status: "unavailable",
      message: "Browser storage is unavailable.",
    };
  }
}

export function saveCareerProfile(profile: CareerProfile): void {
  const validated = careerProfileSchema.parse(profile);

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(validated));
}

export function clearCareerProfile(): void {
  window.localStorage.removeItem(STORAGE_KEY);
}
