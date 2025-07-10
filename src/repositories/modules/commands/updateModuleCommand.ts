"use server";

import { PrismaClient } from "@prisma/client";
import { ModuleSchema } from "@/zodSchemas/moduleSchema";
import { z } from "zod";

const prisma = new PrismaClient();

type updateModuleCommandParams = z.infer<typeof ModuleSchema>;

const updateModuleCommand = async (params: updateModuleCommandParams) => {
  return await prisma.modules.update({
    where: {
      ModuleId: params.ModuleId,
    },
    data: {
      Name: params.Name,
      Path: params.Path,
      Icon: params.Icon,
      Location: params.Location,
    },
  });
};

export default updateModuleCommand;
