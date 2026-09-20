"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";

export type LeadFormFieldType = "text" | "email" | "tel" | "select" | "textarea" | "file";

export interface LeadFormField {
  name: string;
  label: string;
  type: LeadFormFieldType;
  required?: boolean;
  placeholder?: string;
  options?: readonly string[];
  full?: boolean;
  accept?: string;
}

interface LeadFormProps {
  formType: string;
  fields: readonly LeadFormField[];
  submitLabel?: string;
  defaults?: Record<string, string>;
  conversationId?: string | null;
  sessionId?: string | null;
  onSuccess?: (values: Record<string, string>) => void;
  successMessage?: string;
}

export default function LeadForm({
  formType,
  fields,
  submitLabel = "Submit",
  defaults = {},
  conversationId = null,
  sessionId = null,
  onSuccess,
  successMessage = "Thanks — we've received your submission and will be in touch shortly.",
}: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("formType", formType);
    if (conversationId) formData.set("conversationId", conversationId);
    if (sessionId) formData.set("sessionId", sessionId);

    try {
      const res = await fetch("/api/leads", { method: "POST", body: formData });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      const values: Record<string, string> = {};
      for (const field of fields) {
        const value = formData.get(field.name);
        if (typeof value === "string") values[field.name] = value;
      }
      onSuccess?.(values);
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <p className="lead-form__status lead-form__status--success" role="status">
        {successMessage}
      </p>
    );
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit}>
      <div className="lead-form__grid">
        {fields.map((field) => (
          <div
            key={field.name}
            className={`lead-form__field${field.full ? " lead-form__field--full" : ""}`}
          >
            <label className="lead-form__label" htmlFor={`${formType}-${field.name}`}>
              {field.label}
              {!field.required && <span className="lead-form__label-optional"> (optional)</span>}
            </label>

            {field.type === "textarea" ? (
              <textarea
                id={`${formType}-${field.name}`}
                name={field.name}
                required={field.required}
                placeholder={field.placeholder}
                defaultValue={defaults[field.name]}
                className="lead-form__textarea"
              />
            ) : field.type === "select" ? (
              <select
                id={`${formType}-${field.name}`}
                name={field.name}
                required={field.required}
                defaultValue={defaults[field.name] ?? ""}
                className="lead-form__select"
              >
                <option value="" disabled>
                  Select…
                </option>
                {field.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : field.type === "file" ? (
              <input
                id={`${formType}-${field.name}`}
                name={field.name}
                type="file"
                accept={field.accept}
                required={field.required}
                className="lead-form__input"
              />
            ) : (
              <input
                id={`${formType}-${field.name}`}
                name={field.name}
                type={field.type}
                required={field.required}
                placeholder={field.placeholder}
                defaultValue={defaults[field.name]}
                className="lead-form__input"
              />
            )}
          </div>
        ))}
      </div>

      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting…" : submitLabel}
      </Button>

      {status === "error" && (
        <p className="lead-form__status lead-form__status--error" role="alert">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
