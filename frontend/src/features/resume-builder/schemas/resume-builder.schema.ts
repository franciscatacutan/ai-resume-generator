import { z } from "zod";

export const resumeBuilderSchema = z.object({
  jobTitle: z
    .string()
    .trim()
    .min(1, "Job title is required.")
    .max(150, "Job title must be 150 characters or fewer."),
  companyName: z.string().trim().max(150, "Company name must be 150 characters or fewer."),
  jobDescription: z
    .string()
    .trim()
    .min(50, "Please provide a job description of at least 50 characters.")
    .max(20_000, "Job description must be 20,000 characters or fewer."),
  customInstructions: z
    .string()
    .trim()
    .max(2_000, "Instructions must be 2,000 characters or fewer."),
});

export type ResumeBuilderFormValues = z.infer<typeof resumeBuilderSchema>;
