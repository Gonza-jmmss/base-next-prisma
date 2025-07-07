import RoleModuleElementsTable from "./roleModuleElementsTable";
import getAllRoleModuleElementsQuery from "@/repositories/roleModuleElements/queries/getAllRoleModuleElementsQuery";
import Icon from "@/components/common/icon";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import frFR from "@/lang/fr-FR";

export default async function RoleModuleElementsPage() {
  const t = frFR;

  const roleModuleElements = await getAllRoleModuleElementsQuery();

  return (
    <main className="relative mt-3 w-[80vw]">
      <Button asChild className={`absolute -left-16 -top-1`} variant="ghost">
        <Link href={`/settings`}>
          <Icon name={"MdArrowBack"} className="text-xl" />
        </Link>
      </Button>
      <div className="flex justify-between space-x-3">
        <span className="text-xl font-semibold">
          {t.roleModuleElements.title}
        </span>
      </div>
      <RoleModuleElementsTable roleModuleElementsData={roleModuleElements} />
      {/* <pre>{JSON.stringify(roleModuleElements, null, 2)}</pre> */}
    </main>
  );
}
