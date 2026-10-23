export interface CareerSkill {
  id: string;
  name: string;
  category: string;
  proficiency: "beginner" | "intermediate" | "advanced";
  verified: boolean;
}

export interface EmploymentRecord {
  id: string;
  employer: string;
  jobTitle: string;
  startDate: string;
  endDate: string | null;
  responsibilities: string[];
  achievements: string[];
  verified: boolean;
}

export interface CareerProject {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  achievements: string[];
  verified: boolean;
}

export interface EducationRecord {
  id: string;
  institution: string;
  qualification: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string | null;
  verified: boolean;
}

export interface CertificationRecord {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialUrl: string | null;
  verified: boolean;
}

export interface CareerProfile {
  schemaVersion: 1;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  professionalSummary: string;
  skills: CareerSkill[];
  employment: EmploymentRecord[];
  projects: CareerProject[];
  education: EducationRecord[];
  certifications: CertificationRecord[];
  updatedAt: string;
}
