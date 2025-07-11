"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type disableUserParamsType = {
  UserId: number;
};

const disableUserCommand = async (params: disableUserParamsType) => {
  return await prisma.users.update({
    where: {
      UserId: params.UserId,
    },
    data: {
      IsEnabled: false,
    },
  });
};

export default disableUserCommand;
