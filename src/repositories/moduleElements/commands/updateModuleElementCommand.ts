"use server";

import { PrismaClient } from "@prisma/client";
import { ModuleElementSchema } from "@/zodSchemas/moduleElementSchema";
import { z } from "zod";

const prisma = new PrismaClient();

type updateModuleElementCommandParams = z.infer<typeof ModuleElementSchema>;

const updateModuleElementCommand = async (
  params: updateModuleElementCommandParams,
) => {
  return await prisma.moduleElements.update({
    where: {
      ModuleElementId: params.ModuleElementId,
    },
    data: {
      Name: params.Name,
      Path: params.Path,
      Icon: params.Icon,
      Description: params.Description,
      ModuleId: params.ModuleId,
      Location: params.Location,
    },
  });
};

export default updateModuleElementCommand;
