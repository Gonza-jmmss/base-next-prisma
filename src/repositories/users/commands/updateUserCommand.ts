"use server";

import { PrismaClient } from "@prisma/client";
import { UserSchema } from "@/zodSchemas/userSchema";
import { z } from "zod";

const prisma = new PrismaClient();

type updateUserParams = z.infer<typeof UserSchema>;

const updateUserCommand = async (params: updateUserParams) => {
  return await prisma.users.update({
    where: {
      UserId: params.UserId,
    },
    data: {
      UserName: params.UserName,
      RoleId: params.RoleId,
      IsEnabled: params.IsEnabled,
    },
  });
};

export default updateUserCommand;
