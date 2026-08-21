import { describe, expect, it } from "vitest";
import { contactSubmissionSchema, leadSubmissionSchema } from "./haulage-validation";

const validLead = { fullName: "Avery Driver", company: "Avery Freight", email: "avery@example.com", phone: "555-555-0100", truckType: "Dry Van" as const, truckCount: 1, consent: true as const };

describe("Haulage form validation", () => {
  it("accepts a complete free-setup submission with affirmative consent", () => {
    expect(leadSubmissionSchema.safeParse(validLead).success).toBe(true);
  });

  it("rejects a lead with an invalid equipment value or missing consent", () => {
    expect(leadSubmissionSchema.safeParse({ ...validLead, truckType: "Van", consent: false }).success).toBe(false);
  });

  it("requires a valid email and meaningful message for contact submissions", () => {
    expect(contactSubmissionSchema.safeParse({ name: "Avery", email: "not-an-email", subject: "Hi", message: "Hi" }).success).toBe(false);
    expect(contactSubmissionSchema.safeParse({ name: "Avery", email: "avery@example.com", subject: "Question", message: "Could we discuss a dispatch workflow?" }).success).toBe(true);
  });
});
