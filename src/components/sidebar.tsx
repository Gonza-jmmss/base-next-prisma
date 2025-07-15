"use server";

import SidebarComponent from "@/components/sidebar/sidebarComponent";
import getAllModulesByRoleIdQuery from "@/repositories/roleModuleElements/queries/getAllModulesByRoleIdQuery";
import getShortcutRoleModuleElementsByRoleQuery from "@/repositories/roleModuleElements/getShortcutRoleModuleElementsByRoleQuery";
import { ModulesViewModel } from "@/repositories/modules/modulesViewModel";
import { ShortcutRoleModuleElementsViewModel } from "@/repositories/roleModuleElements/roleModuleElementsViewModel";
import { auth } from "@/utils/auth";

export default async function Sidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  let modules: ModulesViewModel[] = [];
  let shortcuts: ShortcutRoleModuleElementsViewModel[] = [];

  if (session) {
    modules = await getAllModulesByRoleIdQuery(session.user.userData.RoleId);
    shortcuts = await getShortcutRoleModuleElementsByRoleQuery({
      RoleId: session.user.userData.RoleId,
    });
  }

  return (
    <SidebarComponent modules={modules} session={session} shortcuts={shortcuts}>
      {children}
    </SidebarComponent>
  );
}
