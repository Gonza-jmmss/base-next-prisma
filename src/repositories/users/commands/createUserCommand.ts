"use server";

import { PrismaClient } from "@prisma/client";
import { UserSchema } from "@/zodSchemas/userSchema";
import bcrypt from "bcryptjs";
import { z } from "zod";

const prisma = new PrismaClient();

type createUserParams = z.infer<typeof UserSchema>;

const createUserCommand = async (params: createUserParams) => {
  const hashedPassword = (await bcrypt.hash(params.Password, 10)).toString();

  return await prisma.users.create({
    data: {
      UserName: params.UserName,
      Password: hashedPassword,
      RoleId: params.RoleId,
      IsEnabled: params.IsEnabled,
    },
  });
};

export default createUserCommand;
