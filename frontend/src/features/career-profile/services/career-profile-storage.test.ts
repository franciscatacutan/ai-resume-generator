import { afterEach, describe, expect, it } from "vitest";
import { clearCareerProfile, loadCareerProfile, saveCareerProfile } from "./career-profile-storage";
import type { CareerProfile } from "../types/career-profile.types";

const validProfile: CareerProfile = {
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

afterEach(() => {
  clearCareerProfile();
});

describe("career profile storage", () => {
  it("returns empty when no profile exists", () => {
    expect(loadCareerProfile()).toEqual({ status: "empty" });
  });

  it("saves and loads a valid profile", () => {
    saveCareerProfile(validProfile);

    expect(loadCareerProfile()).toEqual({
      status: "loaded",
      profile: validProfile,
    });
  });

  it("rejects malformed stored JSON", () => {
    window.localStorage.setItem("ai-resume-generator.career-profile.v1", "{invalid json");

    expect(loadCareerProfile()).toMatchObject({
      status: "invalid",
    });
  });

  it("rejects data that fails schema validation", () => {
    window.localStorage.setItem(
      "ai-resume-generator.career-profile.v1",
      JSON.stringify({ fullName: 42 }),
    );

    expect(loadCareerProfile()).toMatchObject({
      status: "invalid",
    });
  });
});
