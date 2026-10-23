import { useState } from "react";
import { ResumeBuilderForm } from "@/features/resume-builder/components/resume-builder-form";
import type { ResumeGenerationRequest } from "@/features/resume-builder/types/resume-builder.types";

function App() {
  const [requestPreview, setRequestPreview] = useState<ResumeGenerationRequest | null>(null);

  return (
    <main className="min-h-screen bg-muted/30 px-4 py-10 sm:px-6 lg:py-16">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="space-y-3">
          <p className="text-sm font-medium text-primary">AI-powered career workspace</p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">AI Resume Generator</h1>
          <p className="max-w-2xl text-muted-foreground leading-7">
            Tailor your application to a specific opportunity while keeping your experience accurate
            and your qualifications evidence-based.
          </p>
        </header>

        <ResumeBuilderForm onSubmit={setRequestPreview} />

        {requestPreview && (
          <section className="space-y-3" aria-live="polite">
            <h2 className="text-lg font-semibold">Prepared request preview</h2>
            <pre className="overflow-x-auto rounded-lg border bg-card p-4 text-sm">
              {JSON.stringify(requestPreview, null, 2)}
            </pre>
            <p className="text-sm text-muted-foreground">
              Preview only. No information has been sent to an AI service.
            </p>
          </section>
        )}
      </div>
    </main>
  );
}

export default App;
