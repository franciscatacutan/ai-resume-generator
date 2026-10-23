import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CareerProfileForm } from "@/features/career-profile/components/career-profile-form";
import {
  loadCareerProfile,
  saveCareerProfile,
} from "@/features/career-profile/services/career-profile-storage";
import type { CareerProfile } from "@/features/career-profile/types/career-profile.types";
import { ResumeBuilderForm } from "@/features/resume-builder/components/resume-builder-form";
import type { ResumeGenerationRequest } from "@/features/resume-builder/types/resume-builder.types";

type WorkspaceTab = "profile" | "resume";

function App() {
  const [activeTab, setActiveTab] = useState<WorkspaceTab>("profile");
  const [profile, setProfile] = useState<CareerProfile | null>(null);
  const [storageMessage, setStorageMessage] = useState<string | null>(null);
  const [requestPreview, setRequestPreview] = useState<ResumeGenerationRequest | null>(null);

  useEffect(() => {
    const result = loadCareerProfile();

    if (result.status === "loaded") {
      setProfile(result.profile);
    } else if (result.status === "invalid" || result.status === "unavailable") {
      setStorageMessage(result.message);
    }
  }, []);

  function handleSaveProfile(nextProfile: CareerProfile): void {
    try {
      saveCareerProfile(nextProfile);
      setProfile(nextProfile);
      setStorageMessage("Career profile saved in this browser.");
    } catch {
      setStorageMessage("The profile could not be saved. Check browser storage availability.");
    }
  }

  return (
    <main className="min-h-screen bg-muted/30 px-4 py-8 sm:px-6 lg:py-12">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="space-y-3">
          <Badge variant="secondary">Career workspace</Badge>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">AI Resume Generator</h1>
          <p className="max-w-2xl text-muted-foreground">
            Build your career profile once, then tailor your application to individual opportunities
            without inventing experience.
          </p>
        </header>

        <nav className="flex gap-2" aria-label="Workspace sections">
          <Button
            type="button"
            variant={activeTab === "profile" ? "default" : "outline"}
            onClick={() => setActiveTab("profile")}
          >
            Career profile
          </Button>
          <Button
            type="button"
            variant={activeTab === "resume" ? "default" : "outline"}
            onClick={() => setActiveTab("resume")}
          >
            Resume builder
          </Button>
        </nav>

        {storageMessage && (
          <p role="status" className="text-sm text-muted-foreground">
            {storageMessage}
          </p>
        )}

        {activeTab === "profile" ? (
          <CareerProfileForm initialProfile={profile} onSave={handleSaveProfile} />
        ) : (
          <section className="space-y-5">
            <ResumeBuilderForm onSubmit={setRequestPreview} />
            {requestPreview && (
              <pre className="overflow-x-auto rounded-lg border bg-card p-4 text-sm">
                {JSON.stringify(requestPreview, null, 2)}
              </pre>
            )}
          </section>
        )}
      </div>
    </main>
  );
}

export default App;
