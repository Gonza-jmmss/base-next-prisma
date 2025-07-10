import ModulesTable from "./modulesTable";
import getAllModulesQuery from "@/repositories/modules/queries/getAllModulesQuery";
import Icon from "@/components/common/icon";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import frFR from "@/lang/fr-FR";

export default async function ModulesPage() {
  const t = frFR;

  const modules = await getAllModulesQuery();

  return (
    <main className="relative mt-3 w-[80vw]">
      <Button asChild className={`absolute -left-16 -top-1`} variant="ghost">
        <Link href={`/settings`}>
          <Icon name={"MdArrowBack"} className="text-xl" />
        </Link>
      </Button>
      <div className="flex justify-between space-x-3">
        <span className="text-xl font-semibold">{t.modules.title}</span>
      </div>
      <ModulesTable modulesData={modules} />
      {/* <pre>{JSON.stringify(modules, null, 2)}</pre> */}
    </main>
  );
}
