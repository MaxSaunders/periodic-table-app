import { z } from "zod";

const sOrN = z.string().or(z.number());

export const elementSchema = z.object({
  atomicNumber: sOrN,
  symbol: z.string(),
  name: sOrN,
  atomicMass: sOrN,
  cpkHexColor: sOrN,
  electronicConfiguration: sOrN,
  electroNegativity: sOrN,
  atomicRadius: sOrN,
  ionRadius: sOrN,
  vanDerWaalsRadius: sOrN,
  ionizationEnergy: sOrN,
  electronAffinity: sOrN,
  oxidationStates: sOrN,
  standardState: sOrN,
  bondingType: sOrN,
  meltingPoint: sOrN,
  boilingPoint: sOrN,
  density: sOrN,
  groupBlock: sOrN,
  yearDiscovered: sOrN,
  cellsOffset: z.number().optional(),
  isUnstable: z.boolean().optional(),
});

export type Element = z.infer<typeof elementSchema>;
