import { z } from "zod";

export const UserSchema = z.object({
  UserId: z.number(),
  UserName: z.string(),
  Password: z.string(),
  RepeatPassword: z.string(),
  RoleId: z.number(),
  IsEnabled: z.boolean(),
});
