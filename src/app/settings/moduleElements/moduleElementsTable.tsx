"use client";

import { useState, useMemo } from "react";
import deleteModuleElementCommand from "@/repositories/moduleElements/commands/deleteModuleElementCommand";
import { ModuleElementsViewModel } from "@/repositories/moduleElements/moduleElementsViewModel";
import { ColumnDef } from "@tanstack/react-table";
import Table from "@/components/table/table";
import Header from "@/components/table/header";
import { Button } from "@/components/ui/button";
import Icon from "@/components/common/icon";
import isValidIconName from "@/functions/isValidIconName";
import DeleteModal from "@/components/common/deleteModal";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import frFR from "@/lang/fr-FR";

export default function ModuleElementsTable({
  moduleElementsData,
}: {
  moduleElementsData: ModuleElementsViewModel[];
}) {
  const t = frFR;
  const router = useRouter();
  const { toast } = useToast();

  const [openModal, setOpenModal] = useState(false);
  const [selectedModuleElementToDelete, setSelectedModuleElementToDelete] =
    useState(0);
  const [isPending, setIsPending] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
    setSelectedModuleElementToDelete(0);
  };

  const columns = useMemo<ColumnDef<ModuleElementsViewModel, any>[]>(
    () => [
      {
        accessorKey: "ModuleElementId",
        id: "ModuleElementId",
        header: () => (
          <Header text={t.moduleElements.columns.moduleElementId} />
        ),
        size: 30,
        filterFn: "equalsString",
      },
      {
        accessorKey: "Name",
        id: "Name",
        header: () => <Header text={t.moduleElements.columns.name} />,
        filterFn: "equalsString",
      },
      {
        accessorKey: "Path",
        id: "Path",
        header: () => <Header text={t.moduleElements.columns.path} />,
        filterFn: "equalsString",
      },
      {
        accessorKey: "Icon",
        id: "Icon",
        header: () => <Header text={t.moduleElements.columns.icon} />,
        size: 50,
        cell: ({ row }) => (
          <Icon
            name={
              isValidIconName(row.original.Icon)
                ? row.original.Icon
                : "MdOutlineNotInterested"
            }
            className="cursor-pointer text-xl"
          />
        ),
      },
      {
        accessorKey: "ModuleName",
        id: "ModuleName",
        header: () => <Header text={t.moduleElements.columns.moduleName} />,
        filterFn: "equalsString",
      },
      {
        accessorKey: "Location",
        id: "Location",
        header: () => <Header text={t.moduleElements.columns.location} />,
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
              className="cursor-pointer text-xl"
              onClick={() =>
                router.push(
                  `/settings/moduleElements/${row.original.ModuleElementId}?action="edit"`,
                )
              }
            />
            <Icon
              name={"MdDelete"}
              className="cursor-pointer text-xl hover:text-destructive"
              onClick={() => {
                setOpenModal(true);
                setSelectedModuleElementToDelete(row.original.ModuleElementId);
              }}
            />
          </div>
        ),
      },
    ],
    [],
  );

  const deleteModuleElement = async (moduleElementId: number) => {
    try {
      setIsPending(true);
      const moduleElementToDelete = { ModuleElementId: moduleElementId };
      const response = await deleteModuleElementCommand(moduleElementToDelete);

      if (!response) {
        throw new Error(`${t.moduleElements.notifications.deleteFailure}`);
      }
      toast({
        title: `${t.moduleElements.notifications.deleteSuccess}`,
        description: `${t.moduleElements.title} : ${response.Name}`,
      });
      router.refresh();
      closeModal();
    } catch (error) {
      toast({
        variant: "destructive",
        title: `${t.moduleElements.notifications.deleteError}`,
        description: `${error}`,
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-end space-x-5">
        <Button
          variant="outlineColored"
          onClick={() =>
            router.push(`/settings/moduleElements/create?action="create"`)
          }
        >
          <span>{t.moduleElements.create}</span>
        </Button>
      </div>
      <Table
        columns={columns}
        data={moduleElementsData}
        className=""
        onRowClick={(row) =>
          router.push(
            `/settings/moduleElements/${row.ModuleElementId}?action="view"`,
          )
        }
      />
      <DeleteModal
        openModal={openModal}
        closeModal={closeModal}
        titleText={t.moduleElements.deleteModal.title}
        descriptionText={t.moduleElements.deleteModal.description}
        deletefunction={() =>
          deleteModuleElement(selectedModuleElementToDelete)
        }
        isPending={isPending}
      />
    </div>
  );
}
