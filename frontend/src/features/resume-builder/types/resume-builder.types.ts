export interface ResumeBuilderInput {
  jobTitle: string;
  companyName: string;
  jobDescription: string;
  customInstructions: string;
}

export interface ResumeGenerationRequest {
  job: {
    title: string;
    companyName: string;
    description: string;
  };
  customInstructions: string;
}
