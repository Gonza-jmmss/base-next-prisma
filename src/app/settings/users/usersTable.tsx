"use client";

import { useState, useMemo } from "react";
import disableUserCommand from "@/repositories/users/commands/disableUserCommand";
import { AllUsersQueryViewModel } from "@/repositories/users/usersViewModel";
import { ColumnDef } from "@tanstack/react-table";
import Table from "@/components/table/table";
import Header from "@/components/table/header";
import Link from "next/link";
import Icon from "@/components/common/icon";
import DeleteModal from "@/components/common/deleteModal";
import ToggleButton from "@/components/common/toggleButton";
import { Button } from "@/components/ui/button";
import { useUpdateQuery } from "@/hooks/useUpdateQuery";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import frFR from "@/lang/fr-FR";

export default function UsersTable({
  usersData,
  isEnabledSelected,
  urlParams,
}: {
  usersData: AllUsersQueryViewModel[];
  isEnabledSelected: boolean;
  urlParams?: { [key: string]: string | string[] | undefined };
}) {
  const t = frFR;
  const router = useRouter();
  const { toast } = useToast();
  const updateQuery = useUpdateQuery();

  const [showEnabledFilter, setShowEnabledFilter] = useState(
    urlParams?.isEnabled === "false" ? false : true || true,
  );

  const [openModal, setOpenModal] = useState(false);
  const [selectedUSerToDisable, setSelectedUSerToDisable] =
    useState<AllUsersQueryViewModel | null>(null);
  const [isPending, setIsPending] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
    setSelectedUSerToDisable(null);
  };

  const columns = useMemo<ColumnDef<AllUsersQueryViewModel, any>[]>(
    () => [
      {
        accessorKey: "UserId",
        id: "UserId",
        header: () => <Header text={t.users.columns.userId} />,
        filterFn: "equalsString",
      },
      {
        accessorKey: "UserName",
        id: "UserName",
        header: () => <Header text={t.users.columns.userName} />,
        filterFn: "equalsString",
      },
      {
        accessorKey: "RoleName",
        id: "RoleName",
        header: () => <Header text={t.users.columns.roleName} />,
        filterFn: "equalsString",
      },
      {
        accessorKey: "IsEnabled",
        id: "IsEnabled",
        header: () => <Header text={t.users.columns.isEnabled} />,
        cell: (row) =>
          row.row.original.IsEnabled ? t.shared.yes : t.shared.no,
        filterFn: "equalsString",
      },
      {
        accessorKey: "actions",
        id: "actions",
        header: () => <Header text={t.shared.actions} />,
        size: 50,
        cell: ({ row }) => (
          <div
            className="flex space-x-1"
            onClick={(event) => event.stopPropagation()}
          >
            <Icon
              name={"MdEdit"}
              className="cursor-pointer text-xl hover:text-primary"
              onClick={() =>
                router.push(
                  `/settings/users/${row.original.UserId}?action="edit"&isEnabled=${isEnabledSelected}`,
                )
              }
            />
            <Icon
              name={"MdNotInterested"}
              className="cursor-pointer text-xl hover:text-primary"
              onClick={() => {
                setOpenModal(true);
                setSelectedUSerToDisable(row.original);
              }}
            />
          </div>
        ),
      },
    ],
    [],
  );

  const disableUser = async (User: AllUsersQueryViewModel) => {
    try {
      setIsPending(true);
      const UserToDisable = { UserId: User.UserId };
      const response = await disableUserCommand(UserToDisable);

      if (!response) {
        throw new Error(`${t.users.notifications.disableFailure}`);
      }
      toast({
        title: `${t.users.notifications.disableSuccess}`,
        description: `${t.users.title} : ${response.UserName}`,
      });
      router.refresh();
      closeModal();
    } catch (error) {
      toast({
        variant: "destructive",
        title: `${t.users.notifications.disableError}`,
        description: `${error}`,
      });
    } finally {
      setIsPending(false);
    }
  };

  const handleUrlParameterChange = (key: string, value: string) => {
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set(key, value);

    // Update URL without replacing current parameters
    const newUrl = `${window.location.pathname}?${currentParams.toString()}`;

    window.history.pushState({}, "", newUrl);

    // If you need to update some state as well
    updateQuery(Object.fromEntries(currentParams));
  };

  return (
    <div>
      <div className="flex items-center justify-end space-x-5">
        <div className="w-[25rem]">
          <ToggleButton
            options={[
              { key: true, value: t.shared.enables },
              { key: false, value: t.shared.disables },
            ]}
            setItemSelected={(x: { key: boolean; value: string }) => {
              setShowEnabledFilter(x.key);
              handleUrlParameterChange("isEnabled", `${x.key}`);
            }}
            itemSelected={showEnabledFilter}
          />
        </div>
        <Button
          variant="outlineColored"
          onClick={() =>
            router.push(
              `/settings/users/create?action="create"&isEnabled=${isEnabledSelected}`,
            )
          }
        >
          <span>{t.roles.create}</span>
        </Button>
      </div>
      <Table
        columns={columns}
        data={usersData}
        className=""
        onRowClick={(row) =>
          router.push(
            `/settings/users/${row.UserId}?action="view"&isEnabled=${isEnabledSelected}`,
          )
        }
      />
      <DeleteModal
        openModal={openModal}
        closeModal={closeModal}
        titleText={t.users.deleteModal.title}
        descriptionText={t.users.deleteModal.description}
        deletefunction={() => {
          if (selectedUSerToDisable) {
            disableUser(selectedUSerToDisable);
          }
        }}
        isPending={isPending}
        disable
      />
    </div>
  );
}
