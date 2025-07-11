import getRoleModuleElementsByRoleIdQuey from "@/repositories/roleModuleElements/queries/getRoleModuleElementsByRoleIdQuey";
import getAllModulesQuery from "@/repositories/modules/queries/getAllModulesQuery";
import getAllModuleElementsQuery from "@/repositories/moduleElements/queries/getAllModuleElementsQuery";
import getAllRolesQuery from "@/repositories/roles/queries/getAllRolesQuery";
import RoleModuleElementForm from "@/components/roleModuleElements/roleModuleElementsForm";
import getRolesWithoutRoleElementsQuery from "@/repositories/roles/queries/getRolesWithoutRoleElementsQuery";
import Icon from "@/components/common/icon";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import frFR from "@/lang/fr-FR";

export default async function RoleModuleElementPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { action: string };
}) {
  const t = frFR;
  let roleModuleElement;
  const action = searchParams.action?.replace(/"/g, "");

  if (params.id != "create") {
    roleModuleElement = await getRoleModuleElementsByRoleIdQuey({
      RoleId: Number(params.id),
    });
  } else {
    roleModuleElement = null;
  }

  const modules = await getAllModulesQuery();
  const moduleElements = await getAllModuleElementsQuery();
  const roles = await getAllRolesQuery({ IsEnabled: true });
  const rolesWithoutModuleElements = await getRolesWithoutRoleElementsQuery();

  const pagetitle = `${`${t.shared[action as keyof typeof t.shared]} ${t.roleModuleElements.roleModuleElement} 
    ${action != "create" ? `: ${roleModuleElement ? roleModuleElement.RoleName : ""}` : ""}`}`;

  return (
    <main className="relative mt-5 flex justify-center">
      <Button asChild className={`absolute -left-16 top-3`} variant="ghost">
        <Link href={`/settings/roleModuleElements`}>
          <Icon name={"MdArrowBack"} className="text-xl" />
        </Link>
      </Button>
      <div className="w-[50vw] rounded-md border bg-muted/60 p-5 shadow-md">
        <div className="flex items-center justify-between text-lg font-medium">
          {pagetitle}
        </div>
        <div className="mt-5">
          <RoleModuleElementForm
            roleModuleElementData={roleModuleElement}
            modules={modules}
            moduleElements={moduleElements}
            roles={roles}
            rolesWithoutModuleElements={rolesWithoutModuleElements}
            action={action}
          />
        </div>
        {/* <pre>{JSON.stringify(roleModuleElement, null, 2)}</pre> */}
      </div>
    </main>
  );
}
