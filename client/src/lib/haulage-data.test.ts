import { describe, expect, it } from "vitest";
import { calculateIllustrativeAnnualGross } from "./calculator";
import { LEAD_STATUSES, SERVICE_NAMES, TRUCK_TYPES } from "./haulage-data";

describe("Haulage shared requirements", () => {
  it("preserves the exact required equipment, service, and lead status labels", () => {
    expect(TRUCK_TYPES).toEqual(["Dry Van", "Reefer", "Flatbed", "Step Deck", "Hotshot", "Box Truck", "Power Only", "Conestoga"]);
    expect(SERVICE_NAMES).toEqual(["Truck Dispatching", "Rate Negotiation", "Load Planning", "Document Management", "Billing Support", "Compliance Support"]);
    expect(LEAD_STATUSES).toEqual(["New", "Contacted", "Qualified", "Follow-up", "Converted", "Not Qualified", "Closed"]);
  });

  it("returns a conservative, clearly bounded planning calculation", () => {
    expect(calculateIllustrativeAnnualGross(1800, 3, 12, 1)).toBe(247104);
    expect(calculateIllustrativeAnnualGross(1000, 2, 150, 1)).toBe(0);
  });
});
