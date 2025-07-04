import { z } from "zod";

export const ModuleElementSchema = z.object({
  ModuleElementId: z.number(),
  Name: z.string(),
  Path: z.string(),
  Icon: z.string(),
  Description: z.string(),
  ModuleId: z.number().nullable(),
  Location: z.number().nullable(),
});
