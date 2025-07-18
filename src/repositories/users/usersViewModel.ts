export type AllUsersQueryViewModel = {
  UserId: number;
  UserName: string;
  RoleId: number;
  RoleName: string;
  IsEnabled: boolean;
};

export type UsersViewModel = {
  UserId: number;
  UserName: string;
  IsEnabled: boolean;
  Roles: {
    RoleId: number;
    Name: string;
    UpdatedAt: Date | null;
    CreatedAt: Date;
  };
};

export type UserViewModel = {
  UserId: number;
  UserName: string;
  RoleId: number;
  RoleName: string;
  IsEnabled: boolean;
} | null;
