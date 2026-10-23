import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { careerProfileSchema } from "../schemas/career-profile.schema";
import type { CareerProfile } from "../types/career-profile.types";

interface CareerProfileFormProps {
  initialProfile: CareerProfile | null;
  onSave: (profile: CareerProfile) => void;
}

export function CareerProfileForm({ initialProfile, onSave }: CareerProfileFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(careerProfileSchema),
    defaultValues: initialProfile ?? {
      schemaVersion: 1 as const,
      fullName: "",
      email: "",
      phone: "",
      location: "",
      professionalSummary: "",
      skills: [],
      employment: [],
      projects: [],
      education: [],
      certifications: [],
      updatedAt: new Date().toISOString(),
    },
  });

  function handleValidSubmit(
    values: Omit<CareerProfile, "updatedAt"> & { updatedAt: string },
  ): void {
    onSave({
      ...values,
      updatedAt: new Date().toISOString(),
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Master career profile</CardTitle>
        <CardDescription>
          Maintain your source-of-truth career details. We'll add structured editors for employment,
          skills, projects, and credentials next.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-5" noValidate onSubmit={handleSubmit(handleValidSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="fullName">Full name *</Label>
            <Input
              id="fullName"
              aria-invalid={Boolean(errors.fullName)}
              {...register("fullName")}
            />
            {errors.fullName && (
              <p className="text-sm text-destructive">{errors.fullName.message}</p>
            )}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" {...register("phone")} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" placeholder="City, country" {...register("location")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="professionalSummary">Professional summary</Label>
            <Textarea
              id="professionalSummary"
              className="min-h-32 resize-y"
              placeholder="Summarize your experience and strengths using facts you can support."
              {...register("professionalSummary")}
            />
            {errors.professionalSummary && (
              <p className="text-sm text-destructive">{errors.professionalSummary.message}</p>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting}>
            Save career profile
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
