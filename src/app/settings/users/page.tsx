import getAllUsersQuery from "@/repositories/users/queries/getAllUsersQuery";
import UsersTable from "./usersTable";
import Icon from "@/components/common/icon";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import frFR from "@/lang/fr-FR";

export default async function UsersPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const t = frFR;

  const isEnabledParam =
    searchParams?.isEnabled === undefined
      ? true
      : searchParams.isEnabled === "true";

  const users = await getAllUsersQuery({ IsEnabled: isEnabledParam });

  return (
    <main className="relative mt-3 w-[80vw]">
      <Button asChild className={`absolute -left-16 -top-1`} variant="ghost">
        <Link href={`/settings`}>
          <Icon name={"MdArrowBack"} className="text-xl" />
        </Link>
      </Button>
      <div className="flex justify-between space-x-3">
        <span className="text-xl font-semibold">{t.users.pageTitle}</span>
      </div>
      <UsersTable
        usersData={users}
        isEnabledSelected={isEnabledParam}
        urlParams={searchParams}
      />
      {/* <pre>{JSON.stringify(users, null, 2)}</pre> */}
    </main>
  );
}
