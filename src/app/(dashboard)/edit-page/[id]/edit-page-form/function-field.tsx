import type { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Switch } from "~/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { Large } from "~/components/typography";
import { Badge } from "~/components/ui/badge";

type Props = {
  inputs: ContractFunction["inputs"];
  funcIndex: number;
  fieldIndex: number;
  formInstance: UseFormReturn<PageData>;
  title: string;
};

export default function FunctionField({
  inputs,
  funcIndex,
  fieldIndex,
  formInstance,
  title,
}: Props) {
  const isFieldActive = !formInstance.getValues(
    `config.${funcIndex}.inputs.${fieldIndex}.hidden` as any
  );
  return (
    <>
      <div className="flex items-center justify-between">
        <Large className="flex items-center gap-2 pl-4">
          {title}{" "}
          <Badge variant="secondary">
            {formInstance.getValues(
              `config.${funcIndex}.inputs.${fieldIndex}.type`
            )}
          </Badge>
        </Large>
        <FormField
          control={formInstance.control}
          name={`config.${funcIndex}.inputs.${fieldIndex}.hidden`}
          render={({ field }) => (
            <FormItem className="flex items-center">
              <FormControl>
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <Switch
                          checked={!field.value}
                          onCheckedChange={(value) => field.onChange(!value)}
                        />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className="m-2">
                      <p>
                        Toggle to <strong>hide/show</strong> field in the
                        preview
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      {isFieldActive ? (
        <div className="pl-8 grid gap-4">
          <FormField
            control={formInstance.control}
            name={`config.${funcIndex}.inputs.${fieldIndex}.name`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Specify a custom display name for a field (optional)"
                    {...field}
                    value={field.value ? field.value : ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formInstance.control}
            name={`config.${funcIndex}.inputs.${fieldIndex}.description`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Write a field description (optional)"
                    {...field}
                    value={field.value ? field.value : ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formInstance.control}
            name={`config.${funcIndex}.inputs.${fieldIndex}.value`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex justify-between items-end">
                  Default Value{" "}
                  <Badge variant="secondary">
                    {formInstance.getValues(
                      `config.${funcIndex}.inputs.${fieldIndex}.type`
                    )}
                  </Badge>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Pre-fill the field with default data (optional)"
                    {...field}
                    value={field.value ? field.value : ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      ) : null}
    </>
  );
}
