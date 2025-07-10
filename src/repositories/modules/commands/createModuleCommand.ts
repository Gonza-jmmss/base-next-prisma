"use server";

import { PrismaClient } from "@prisma/client";
import { ModuleSchema } from "@/zodSchemas/moduleSchema";
import { z } from "zod";

const prisma = new PrismaClient();

type createModuleCommandParams = z.infer<typeof ModuleSchema>;

const createModuleCommand = async (params: createModuleCommandParams) => {
  const command = await prisma.modules.create({
    data: {
      Name: params.Name,
      Path: params.Path,
      Icon: params.Icon,
      Location: params.Location,
    },
  });

  return command;
};

export default createModuleCommand;
