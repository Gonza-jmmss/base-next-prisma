"use server";

import { PrismaClient } from "@prisma/client";
import { ModuleElementSchema } from "@/zodSchemas/moduleElementsSchema";
import { z } from "zod";

const prisma = new PrismaClient();

type createModuleElementCommandParams = z.infer<typeof ModuleElementSchema>;

const createModuleElementCommand = async (
  params: createModuleElementCommandParams,
) => {
  const command = await prisma.moduleElements.create({
    data: {
      Name: params.Name,
      Path: params.Path,
      Icon: params.Icon,
      Description: params.Description,
      ModuleId: params.ModuleId,
      Location: params.Location,
    },
  });

  return command;
};

export default createModuleElementCommand;
