import { describe, expect, it, vi } from "vitest";

const { values, insert, sendLeadSubmissionEmail } = vi.hoisted(() => {
  const values = vi.fn(async () => [{ insertId: 41 }]);
  const insert = vi.fn(() => ({ values }));
  const sendLeadSubmissionEmail = vi.fn(async () => true);
  return { values, insert, sendLeadSubmissionEmail };
});

vi.mock("../db", () => ({ getDb: vi.fn(async () => ({ insert })) }));
vi.mock("../_core/email", () => ({ sendLeadSubmissionEmail }));

import { haulageRouter } from "./haulage";

describe("Haulage public procedures", () => {
  it("stores a validated free-setup lead through the tRPC procedure", async () => {
    const caller = haulageRouter.createCaller({} as never);
    const result = await caller.lead.submit({ fullName: "Avery Driver", company: "Avery Freight", email: "avery@example.com", phone: "555-555-0100", truckType: "Dry Van", truckCount: 1, consent: true });
    expect(result).toEqual({ id: 41, success: true });
    expect(insert).toHaveBeenCalledTimes(1);
    expect(values).toHaveBeenCalledWith(expect.objectContaining({ fullName: "Avery Driver", truckType: "Dry Van", consent: true }));
    expect(sendLeadSubmissionEmail).toHaveBeenCalledWith(expect.objectContaining({ fullName: "Avery Driver", email: "avery@example.com" }));
  });
});
