import { z } from "zod";

const nonEmpty = (label: string, max: number) =>
  z.string().trim().min(1, `${label} is required.`).max(max);

const optionalText = (max: number) => z.string().trim().max(max);

const skillSchema = z.object({
  id: z.string().min(1),
  name: nonEmpty("Skill name", 100),
  category: nonEmpty("Skill category", 80),
  proficiency: z.enum(["beginner", "intermediate", "advanced"]),
  verified: z.boolean(),
});

const employmentSchema = z.object({
  id: z.string().min(1),
  employer: nonEmpty("Employer", 150),
  jobTitle: nonEmpty("Job title", 150),
  startDate: z.string(),
  endDate: z.string().nullable(),
  responsibilities: z.array(z.string().trim().min(1).max(1000)).max(30),
  achievements: z.array(z.string().trim().min(1).max(1000)).max(30),
  verified: z.boolean(),
});

const projectSchema = z.object({
  id: z.string().min(1),
  name: nonEmpty("Project name", 150),
  description: nonEmpty("Project description", 2000),
  technologies: z.array(z.string().trim().min(1).max(100)).max(50),
  achievements: z.array(z.string().trim().min(1).max(1000)).max(30),
  verified: z.boolean(),
});

const educationSchema = z.object({
  id: z.string().min(1),
  institution: nonEmpty("Institution", 200),
  qualification: nonEmpty("Qualification", 150),
  fieldOfStudy: optionalText(150),
  startDate: z.string(),
  endDate: z.string().nullable(),
  verified: z.boolean(),
});

const certificationSchema = z.object({
  id: z.string().min(1),
  name: nonEmpty("Certification name", 200),
  issuer: nonEmpty("Issuer", 150),
  issueDate: z.string(),
  credentialUrl: z.string().url().nullable(),
  verified: z.boolean(),
});

export const careerProfileSchema = z.object({
  schemaVersion: z.literal(1),
  fullName: nonEmpty("Full name", 150),
  email: z.union([z.literal(""), z.string().email()]),
  phone: optionalText(40),
  location: optionalText(150),
  professionalSummary: optionalText(3000),
  skills: z.array(skillSchema).max(200),
  employment: z.array(employmentSchema).max(50),
  projects: z.array(projectSchema).max(100),
  education: z.array(educationSchema).max(30),
  certifications: z.array(certificationSchema).max(100),
  updatedAt: z.string().datetime(),
});

export type CareerProfileInput = z.input<typeof careerProfileSchema>;
