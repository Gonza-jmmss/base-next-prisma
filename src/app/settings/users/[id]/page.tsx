import getUserByUserIdQuery from "@/repositories/users/queries/getUserByUserIdQuery";
import getAllRolesQuery from "@/repositories/roles/queries/getAllRolesQuery";
import UserForm from "@/components/users/userForm";
import Icon from "@/components/common/icon";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import frFR from "@/lang/fr-FR";

export default async function UserPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const t = frFR;
  let user;
  const action =
    searchParams?.action && (searchParams.action as string).replace(/"/g, "");

  const isEnabledParam =
    searchParams.isEnabled === undefined
      ? true
      : searchParams.isEnabled === "true";

  if (params.id != "create") {
    user = await getUserByUserIdQuery(Number(params.id));
  } else {
    user = null;
  }

  const roles = await getAllRolesQuery({ IsEnabled: true });

  const pagetitle = `${`${t.shared[action as keyof typeof t.shared]} ${t.users.user} 
    ${action != "create" ? `: ${user ? user.UserName : ""}` : ""}`}`;

  return (
    <main className="relative mt-5 flex justify-center">
      <Button asChild className={`absolute -left-16 top-3`} variant="ghost">
        <Link href={`/settings/users?isEnabled=${isEnabledParam}`}>
          <Icon name={"MdArrowBack"} className="text-xl" />
        </Link>
      </Button>
      <div className="mt-3 w-[50vw] rounded-md border bg-muted/60 p-5 shadow-md">
        <div className="flex items-center justify-between text-xl font-semibold">
          {pagetitle}
        </div>
        <div className="mt-5">
          <UserForm
            userData={user}
            roles={roles}
            action={action}
            urlParams={searchParams}
          />
        </div>
      </div>
    </main>
  );
}
