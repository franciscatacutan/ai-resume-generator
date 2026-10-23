import { describe, expect, it } from "vitest";
import { exportCareerProfile, importCareerProfile } from "./career-profile-transfer";
import type { CareerProfile } from "../types/career-profile.types";

const profile: CareerProfile = {
  schemaVersion: 1,
  fullName: "Test User",
  email: "test@example.com",
  phone: "",
  location: "",
  professionalSummary: "",
  skills: [],
  employment: [],
  projects: [],
  education: [],
  certifications: [],
  updatedAt: "2026-10-23T00:00:00.000Z",
};

describe("career profile transfer", () => {
  it("exports and imports a valid profile", () => {
    expect(importCareerProfile(exportCareerProfile(profile))).toEqual(profile);
  });

  it("rejects invalid profile data", () => {
    expect(() => importCareerProfile('{"fullName":42}')).toThrow();
  });

  it("rejects invalid JSON", () => {
    expect(() => importCareerProfile("{invalid")).toThrow();
  });
});
