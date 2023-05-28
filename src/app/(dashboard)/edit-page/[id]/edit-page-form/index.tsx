"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import FunctionTitle from "./function-title";
import FunctionField from "./function-field";
import { Input } from "~/components/ui/input";
import { useToast } from "~/components/ui/use-toast";
import { H3 } from "~/components/typography";

type Props = {
  data: PageData;
};

export default function EditPageForm({ data }: Props) {
  const { toast } = useToast();

  const form = useForm<PageData>({
    defaultValues: data,
  });

  async function onSubmit(values: PageData) {
    const loadingToast = toast({
      title: "Saving...",
    });
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/edit-page`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    ).then((res) => res.json());

    if (result.error) {
      loadingToast.dismiss();
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong",
        description: "Couldn't save your update",
      });
      return;
    }
    loadingToast.dismiss();
    toast({
      title: "Saved!",
      description: "Your link is updated",
    });
  }

  return (
    <Form {...form}>
      <form
        id="edit-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="container pb-10"
      >
        <H3 className="mb-4">General information:</H3>
        <div className="grid gap-4 border rounded-lg p-4 mb-10">
          <FormField
            control={form.control}
            name={"name"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Page name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Name"
                    {...field}
                    value={field.value ? field.value : ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"description"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Page description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Description"
                    {...field}
                    value={field.value ? field.value : ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <H3 className="mb-4">Contract functions:</H3>
        <div className="grid gap-5">
          {data.config.map((func, index) => {
            const isFunctionActive = !form.getValues(`config.${index}.hidden`);
            return (
              <div
                className="p-4 rounded-lg border"
                key={`${func.id}-${index}`}
              >
                <div className="flex items-center gap-10">
                  <FunctionTitle
                    titleName={`config.${index}.name`}
                    switchName={`config.${index}.hidden`}
                    formInstance={form}
                  />
                </div>
                {isFunctionActive ? (
                  <>
                    <FormField
                      control={form.control}
                      name={`config.${index}.description`}
                      render={({ field }) => (
                        <FormItem className="mt-5">
                          <FormLabel>Function description</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Short description (optional)"
                              {...field}
                              value={field.value ? field.value : ""}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {!!func.inputs.length ? (
                      <>
                        <hr className="my-5" />
                        <div className="grid gap-6 mb-3">
                          {func.inputs.map((funcField, fieldIndex) => {
                            return (
                              <div
                                key={funcField.id}
                                className="grid gap-4 items-center [&:not(:last-child)]:border-b [&:not(:last-child)]:pb-5"
                              >
                                <FunctionField
                                  inputs={func.inputs}
                                  formInstance={form}
                                  funcIndex={index}
                                  fieldIndex={fieldIndex}
                                  title={funcField.id}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </>
                    ) : null}
                  </>
                ) : null}
              </div>
            );
          })}
        </div>
      </form>
    </Form>
  );
}
