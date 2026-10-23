import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  resumeBuilderSchema,
  type ResumeBuilderFormValues,
} from "../schemas/resume-builder.schema";
import type { ResumeGenerationRequest } from "../types/resume-builder.types";

interface ResumeBuilderFormProps {
  onSubmit: (request: ResumeGenerationRequest) => void;
}

export function ResumeBuilderForm({ onSubmit }: ResumeBuilderFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResumeBuilderFormValues>({
    resolver: zodResolver(resumeBuilderSchema),
    defaultValues: {
      jobTitle: "",
      companyName: "",
      jobDescription: "",
      customInstructions: "",
    },
    mode: "onBlur",
  });

  function handleValidSubmit(values: ResumeBuilderFormValues): void {
    onSubmit({
      job: {
        title: values.jobTitle,
        companyName: values.companyName,
        description: values.jobDescription,
      },
      customInstructions: values.customInstructions,
    });
  }

  return (
    <Card className="w-full border-border/70 shadow-sm">
      <CardHeader className="space-y-3">
        <Badge variant="secondary" className="w-fit">
          Resume workspace
        </Badge>
        <CardTitle className="text-2xl tracking-tight">Tailor your resume</CardTitle>
        <CardDescription className="max-w-2xl leading-6">
          Provide the target role and job description. We&apos;ll use these details to prepare a
          tailored resume and job-fit analysis.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-6" onSubmit={handleSubmit(handleValidSubmit)} noValidate>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Target job title *</Label>
              <Input
                id="jobTitle"
                placeholder="e.g. Software Engineer"
                aria-invalid={Boolean(errors.jobTitle)}
                aria-describedby={errors.jobTitle ? "jobTitle-error" : undefined}
                {...register("jobTitle")}
              />
              {errors.jobTitle && (
                <p id="jobTitle-error" className="text-sm text-destructive">
                  {errors.jobTitle.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyName">Company</Label>
              <Input
                id="companyName"
                placeholder="e.g. Example Technologies"
                aria-invalid={Boolean(errors.companyName)}
                aria-describedby={errors.companyName ? "companyName-error" : undefined}
                {...register("companyName")}
              />
              {errors.companyName && (
                <p id="companyName-error" className="text-sm text-destructive">
                  {errors.companyName.message}
                </p>
              )}
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="jobDescription">Job description *</Label>
            <Textarea
              id="jobDescription"
              placeholder="Paste the complete job description, including responsibilities and qualifications..."
              className="min-h-56 resize-y"
              aria-invalid={Boolean(errors.jobDescription)}
              aria-describedby={
                errors.jobDescription ? "jobDescription-error" : "jobDescription-help"
              }
              {...register("jobDescription")}
            />
            {errors.jobDescription ? (
              <p id="jobDescription-error" className="text-sm text-destructive">
                {errors.jobDescription.message}
              </p>
            ) : (
              <p id="jobDescription-help" className="text-sm text-muted-foreground">
                Include responsibilities, required skills, and qualifications.
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="customInstructions">Additional instructions</Label>
            <Textarea
              id="customInstructions"
              placeholder="e.g. Emphasize backend development and API testing. Do not invent experience or qualifications."
              className="min-h-24 resize-y"
              aria-invalid={Boolean(errors.customInstructions)}
              aria-describedby={errors.customInstructions ? "customInstructions-error" : undefined}
              {...register("customInstructions")}
            />
            {errors.customInstructions && (
              <p id="customInstructions-error" className="text-sm text-destructive">
                {errors.customInstructions.message}
              </p>
            )}
          </div>

          <div className="flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
              Your resume must be based on verified career information.
            </p>
            <Button type="submit" disabled={isSubmitting}>
              Prepare generation request
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
