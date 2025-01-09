import getAllModulesQuery from "@/repositories/modules/queries/getAllModulesQuery";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Icon from "@/components/common/icon";
import isValidIconName from "@/functions/isValidIconName";
import frFR from "@/lang/fr-FR";

export default async function Home() {
  const t = frFR;

  const modules = await getAllModulesQuery();

  return (
    <main className="mt-6 flex w-full justify-center">
      <div className="mt-3 w-[80vw]">
        <div className="flex justify-center">
          <span className="text-4xl font-bold">{t.shared.welcome}</span>
        </div>
        <div className={`mt-10 flex justify-center space-x-8`}>
          {modules.slice(1).map((element, index) => (
            <Button
              key={index}
              asChild
              className={`h-[10rem] w-[10rem]`}
              variant="outline"
            >
              <Link
                href={`${element.Path}`}
                className="flex flex-col space-y-2"
              >
                <Icon
                  name={
                    isValidIconName(element.Icon)
                      ? element.Icon
                      : "MdOutlineNotInterested"
                  }
                  className="text-3xl"
                />
                <span className="text-lg">{element.Name}</span>
              </Link>
            </Button>
          ))}
        </div>
        <div className="mt-10 flex w-full items-center space-x-3">
          <div className="w-full border-b" />
          <div className="text-lg font-semibold">{t.shared.shortcut}</div>
          <div className="w-full border-b" />
        </div>
        <div className={`mt-8 flex justify-center space-x-8`}>
          <Button className={`h-[4rem] w-[10rem]`} variant="outline">
            <Link
              href={`/reports/ifleStudentsNotes`}
              className="flex space-x-2"
            >
              <Icon
                name={
                  isValidIconName("MdDvr") ? "MdDvr" : "MdOutlineNotInterested"
                }
                className="text-2xl"
              />
              <span className="text-base">{t.shortcuts.transcripts}</span>
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
