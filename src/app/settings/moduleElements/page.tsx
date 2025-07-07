import ModuleElementsTable from "./moduleElementsTable";
import getAllModuleElementsQuery from "@/repositories/moduleElements/queries/getAllModuleElementsQuery";
import Icon from "@/components/common/icon";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import frFR from "@/lang/fr-FR";

export default async function ModuleElementsPage() {
  const t = frFR;

  const moduleElements = await getAllModuleElementsQuery();

  return (
    <main className="relative mt-3 w-[80vw]">
      <Button asChild className={`absolute -left-16 -top-1`} variant="ghost">
        <Link href={`/settings`}>
          <Icon name={"MdArrowBack"} className="text-xl" />
        </Link>
      </Button>
      <div className="flex justify-between space-x-3">
        <span className="text-xl font-semibold">{t.moduleElements.title}</span>
      </div>
      <ModuleElementsTable moduleElementsData={moduleElements} />
      {/* <pre>{JSON.stringify(moduleElements, null, 2)}</pre> */}
    </main>
  );
}
