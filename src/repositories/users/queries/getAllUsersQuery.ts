import { cache, use } from "react";
import { PrismaClient } from "@prisma/client";
import { UsersViewModel } from "../usersViewModel";

const prisma = new PrismaClient();

type getAllUsersQueryParams = {
  IsEnabled: boolean;
};

const getAllUsersQuery = cache(async (params: getAllUsersQueryParams) => {
  const query = await prisma.users.findMany({
    where: { IsEnabled: params.IsEnabled },
    include: {
      Roles: true,
    },
  });

  const res = query.map((users: UsersViewModel) => ({
    UserId: users.UserId,
    UserName: users.UserName,
    RoleId: users.Roles.RoleId,
    RoleName: users.Roles.Name,
    IsEnabled: users.IsEnabled,
  }));

  return res;
});

export default getAllUsersQuery;
