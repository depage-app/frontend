import { Edit3 } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import { H4 } from "~/components/typography";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { outlineResetStyles } from "~/components/ui/input";
import { Switch } from "~/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

type Props = {
  formInstance: UseFormReturn<PageData>;
  titleName: any;
  switchName: any;
};

export default function FunctionTitle({
  formInstance,
  titleName,
  switchName,
}: Props) {
  return (
    <>
      <H4 className="flex-grow">
        <FormField
          control={formInstance.control}
          name={titleName}
          render={({ field }) => (
            <FormItem className="flex items-center gap-3">
              <FormLabel>
                <Edit3 className="w-5" />
              </FormLabel>
              <FormControl>
                <input
                  className={outlineResetStyles}
                  placeholder="Function Name"
                  {...field}
                  value={field.value ? field.value : ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </H4>
      <FormField
        control={formInstance.control}
        name={switchName}
        render={({ field }) => (
          <FormItem className="flex items-center">
            <FormControl>
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>
                      <Switch
                        checked={!field.value}
                        onCheckedChange={(checked) => field.onChange(!checked)}
                      />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent className="m-2">
                    <p>
                      Toggle to <strong>hide/show</strong> function in the
                      preview
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
}
