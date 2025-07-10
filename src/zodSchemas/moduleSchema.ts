import { z } from "zod";

export const ModuleSchema = z.object({
  ModuleId: z.number(),
  Name: z.string(),
  Path: z.string(),
  Icon: z.string(),
  Location: z.number().nullable(),
});
