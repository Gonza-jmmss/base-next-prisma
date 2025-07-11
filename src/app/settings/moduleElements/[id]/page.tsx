import getModuleElementByIdQuery from "@/repositories/moduleElements/queries/getModuleElementById.Query";
import getAllModulesQuery from "@/repositories/modules/queries/getAllModulesQuery";
import ModuleElementForm from "@/components/moduleElement/moduleElementForm";
import Icon from "@/components/common/icon";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import frFR from "@/lang/fr-FR";

export default async function ModuleElementPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { action: string };
}) {
  const t = frFR;
  let moduleElement;
  const action = searchParams.action?.replace(/"/g, "");

  if (params.id != "create") {
    moduleElement = await getModuleElementByIdQuery(Number(params.id));
  } else {
    moduleElement = null;
  }

  const modules = await getAllModulesQuery();

  const pagetitle = `${`${t.shared[action as keyof typeof t.shared]} ${t.moduleElements.moduleElement} 
    ${action != "create" ? `: ${moduleElement ? moduleElement.Name : ""}` : ""}`}`;

  return (
    <main className="relative mt-5 flex justify-center">
      <Button asChild className={`absolute -left-16 top-3`} variant="ghost">
        <Link href={`/settings/moduleElements`}>
          <Icon name={"MdArrowBack"} className="text-xl" />
        </Link>
      </Button>
      <div className="w-[50vw] rounded-md border bg-muted/60 p-5 shadow-md">
        <div className="flex items-center justify-between text-lg font-medium">
          {pagetitle}
        </div>
        <div className="mt-5">
          <ModuleElementForm
            moduleElementData={moduleElement}
            modules={modules}
            action={action}
          />
        </div>
        {/* <pre>{JSON.stringify(module, null, 2)}</pre> */}
      </div>
    </main>
  );
}
