import { describe, expect, it } from "vitest";
import { leadStatuses, serviceNames, truckTypeNames } from "../../drizzle/schema";

describe("Haulage server contracts", () => {
  it("uses the exact required lead statuses, service names, and truck type names", () => {
    expect(leadStatuses).toEqual(["New", "Contacted", "Qualified", "Follow-up", "Converted", "Not Qualified", "Closed"]);
    expect(serviceNames).toEqual(["Truck Dispatching", "Rate Negotiation", "Load Planning", "Document Management", "Billing Support", "Compliance Support"]);
    expect(truckTypeNames).toEqual(["Dry Van", "Reefer", "Flatbed", "Step Deck", "Hotshot", "Box Truck", "Power Only", "Conestoga"]);
  });
});
