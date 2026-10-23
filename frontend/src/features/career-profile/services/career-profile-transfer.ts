import { careerProfileSchema } from "../schemas/career-profile.schema";
import type { CareerProfile } from "../types/career-profile.types";

export function exportCareerProfile(profile: CareerProfile): string {
  const validated = careerProfileSchema.parse(profile);

  return JSON.stringify(validated, null, 2);
}

export function importCareerProfile(json: string): CareerProfile {
  const parsed: unknown = JSON.parse(json);
  return careerProfileSchema.parse(parsed);
}
