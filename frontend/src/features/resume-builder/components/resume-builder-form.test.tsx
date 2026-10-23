import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ResumeBuilderForm } from "./resume-builder-form";

describe("ResumeBuilderForm", () => {
  it("shows validation errors when required fields are empty", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<ResumeBuilderForm onSubmit={onSubmit} />);

    await user.click(screen.getByRole("button", { name: /prepare generation request/i }));

    expect(await screen.findByText("Job title is required.")).toBeInTheDocument();
    expect(
      screen.getByText("Please provide a job description of at least 50 characters."),
    ).toBeInTheDocument();

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("submits a normalized request when the form is valid", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<ResumeBuilderForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/target job title/i), "  Software Engineer  ");
    await user.type(screen.getByLabelText(/company/i), "Example Corp");
    await user.type(
      screen.getByLabelText(/job description/i),
      "Build and maintain backend services, REST APIs, automated tests, and reliable production systems.",
    );
    await user.type(screen.getByLabelText(/additional instructions/i), "Emphasize API testing.");

    await user.click(screen.getByRole("button", { name: /prepare generation request/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        job: {
          title: "Software Engineer",
          companyName: "Example Corp",
          description:
            "Build and maintain backend services, REST APIs, automated tests, and reliable production systems.",
        },
        customInstructions: "Emphasize API testing.",
      });
    });
  });
});
