"use client";

import { useState } from "react";
import createUserCommand from "@/repositories/users/commands/createUserCommand";
import updateUserCommand from "@/repositories/users/commands/updateUserCommand";
import updateUserPasswordCommand from "@/repositories/users/commands/updateUserPasswordCommand";
import { UserSchema } from "@/zodSchemas/userSchema";
import { useForm } from "@tanstack/react-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Combobox from "@/components/common/combobox";
import ToggleButton from "@/components/common/toggleButton";
import { UserViewModel } from "@/repositories/users/usersViewModel";
import { RolesViewModel } from "@/repositories/roles/rolesViewModel";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { z } from "zod";
import frFR from "@/lang/fr-FR";

type UserFormData = z.infer<typeof UserSchema>;

export default function UserForm({
  userData,
  roles,
  action,
  urlParams,
}: {
  userData: UserViewModel | null;
  roles: RolesViewModel[];
  action: string | undefined;
  urlParams?: { [key: string]: string | string[] | undefined };
}) {
  const t = frFR;
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const isEnabledParam =
    urlParams?.isEnabled === undefined ? true : urlParams.isEnabled === "true";

  const form = useForm<UserFormData>({
    defaultValues: {
      UserId: action !== "create" ? (userData?.UserId ?? 0) : 0,
      UserName: action !== "create" ? (userData?.UserName ?? "") : "",
      Password: "",
      RepeatPassword: "",
      RoleId: action !== "create" ? (userData?.RoleId ?? 0) : 0,
      IsEnabled: action !== "create" ? (userData?.IsEnabled ?? true) : true,
    },
    onSubmit: async ({ value }) => {
      // console.log("form", value);
      setIsPending(true);
      action === "create" && createUser(value);
      action === "edit" && updateUser(value);
      action === "password" && updateUserPassword(value);
    },
  });

  const createUser = async (formData: UserFormData) => {
    try {
      const response = await createUserCommand(formData);

      if (!response) {
        throw new Error(`${t.users.notifications.createFailure}`);
      }
      toast({
        title: `${t.users.notifications.createSuccess}`,
        description: `${t.users.title} : ${response.UserName}`,
      });

      router.push(`/settings/users?isEnabled=${isEnabledParam}`);
      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: `${t.users.notifications.createError}`,
        description: `${error}`,
      });
    } finally {
      setIsPending(false);
    }
  };

  const updateUser = async (formData: UserFormData) => {
    try {
      const response = await updateUserCommand(formData);

      if (!response) {
        throw new Error(`${t.users.notifications.updateFailure}`);
      }
      toast({
        title: `${t.users.notifications.updateSuccess}`,
        description: `${t.users.title} : ${response.UserName}`,
      });

      router.push(`/settings/users?isEnabled=${isEnabledParam}`);
      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: `${t.users.notifications.updateError}`,
        description: `${error}`,
      });
    } finally {
      setIsPending(false);
    }
  };

  const updateUserPassword = async (formData: UserFormData) => {
    try {
      const response = await updateUserPasswordCommand(formData);

      if (!response) {
        throw new Error(`${t.users.notifications.updatePasswordFailure}`);
      }
      toast({
        title: `${t.users.notifications.updatePasswordSuccess}`,
        description: `${t.users.title} : ${response.UserName}`,
      });

      router.push(`/settings/users?isEnabled=${isEnabledParam}`);
      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: `${t.users.notifications.updatePasswordError}`,
        description: `${error}`,
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="flex flex-col space-y-5"
    >
      {action !== "password" && (
        <>
          <div className="space-y-1">
            <form.Field
              name="UserName"
              children={(field) => (
                <>
                  <span>{t.users.form.userName}</span>
                  <Input
                    id="UserName"
                    name="UserName"
                    placeholder={`${t.users.form.userName}`}
                    className="w-full"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    disabled={action === "view"}
                    required
                  />
                </>
              )}
            />
          </div>
          <div className="space-y-1">
            <form.Field
              name="IsEnabled"
              children={(field) => (
                <>
                  <span>{t.users.form.isEnabled}</span>
                  <ToggleButton
                    options={[
                      { key: false, value: t.shared.no },
                      { key: true, value: t.shared.yes },
                    ]}
                    setItemSelected={(x: { key: boolean; value: string }) => {
                      field.handleChange(x && x.key);
                    }}
                    itemSelected={field.state.value}
                  />
                </>
              )}
            />
          </div>
          <div className="space-y-1">
            <form.Field
              name="RoleId"
              children={(field) => (
                <>
                  <span>{t.users.form.role}</span>
                  <Combobox
                    options={roles}
                    textAttribute="Name"
                    valueAttribute="RoleId"
                    placeholder={t.users.form.role}
                    itemSelected={roles.find(
                      (x) => x.RoleId === field.state.value,
                    )}
                    setItemSelected={(x: { RoleId: number; Name: string }) => {
                      field.handleChange(x && x.RoleId);
                    }}
                    disabled={action === "view"}
                    showSearch
                  />
                </>
              )}
            />
          </div>
        </>
      )}
      {(action === "password" || action === "create") && (
        <>
          <div className="space-y-1">
            <form.Field
              name="Password"
              validators={{
                onChange: z.string().min(8, t.users.validation.password),
              }}
              children={(field) => (
                <>
                  <span>{t.users.form.password}</span>
                  <Input
                    id="Password"
                    name="Password"
                    placeholder={`${t.users.form.password}`}
                    type="password"
                    className="w-full"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    required={action === "create"}
                  />
                  <div className="text-xs text-red-500">
                    {field.state.meta.errors}
                  </div>
                </>
              )}
            />
          </div>
          <div className="space-y-1">
            <form.Field
              name="RepeatPassword"
              validators={{
                onChangeListenTo: ["Password"],
                onChange: ({ value, fieldApi }) => {
                  if (value !== fieldApi.form.getFieldValue("Password")) {
                    return t.users.validation.repeatPassword;
                  }
                  return undefined;
                },
              }}
              children={(field) => (
                <>
                  <span>{t.users.form.repeatPassword}</span>
                  <Input
                    id="RepeatPassword"
                    name="RepeatPassword"
                    placeholder={`${t.users.form.repeatPassword}`}
                    type="password"
                    className="w-full"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    required={action === "create"}
                  />
                  <div className="text-xs text-red-500">
                    {field.state.meta.errors}
                  </div>
                </>
              )}
            />
          </div>
        </>
      )}
      {action !== "view" ? (
        <div className="flex justify-center space-x-3">
          <Button
            type="button"
            variant={"secondary"}
            className="w-[40%]"
            onClick={() =>
              router.push(`/settings/users?isEnabled=${isEnabledParam}`)
            }
          >
            {t.shared.cancel}
          </Button>
          <Button
            type="submit"
            variant={"default"}
            className="w-[40%]"
            disabled={isPending}
          >
            {t.shared.save}
          </Button>
        </div>
      ) : (
        <div className="flex justify-center space-x-3">
          <Button
            variant={"secondary"}
            className="w-[40%]"
            onClick={() =>
              router.push(`/settings/users?isEnabled=${isEnabledParam}`)
            }
          >
            {t.shared.cancel}
          </Button>
        </div>
      )}
    </form>
  );
}
