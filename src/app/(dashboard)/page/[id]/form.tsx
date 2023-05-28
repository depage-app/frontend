"use client";

import { ExternalLink, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { stringToBytes } from "viem";
import { useAccount, useContractWrite } from "wagmi";
import { Connect } from "~/components/connect";
import { H3, Subtle } from "~/components/typography";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useToast } from "~/components/ui/use-toast";

type Props = Pick<PageData, "abi" | "chain_id" | "contract_address"> & {
  data: ContractFunction;
};

export default function PageForm({
  data,
  contract_address,
  chain_id,
  abi,
}: Props) {
  const { isConnected } = useAccount();
  const { toast } = useToast();

  const form = useForm<ContractFunction>({
    defaultValues: {
      id: data.id,
      inputs: data.inputs.map((input) => ({
        ...input,
        id: input.id,
        value: input.value,
      })),
    },
  });

  const { write, isLoading } = useContractWrite({
    abi,
    address: contract_address as any,
    chainId: chain_id,
    functionName: data.id,
    onError(error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong",
        // description: error.detail,
      });
      console.log("Error", error);
    },
    onSuccess(data) {
      console.log("Success", data);
      toast({
        title: "Hooray! Your transaction has been executed",
        description: (
          <Button size="sm" variant="outline" asChild>
            <a
              href={`https://polygonscan.com/tx/${data.hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1"
            >
              <ExternalLink className="w-4 mr-2" />
              Open Explorer
            </a>
          </Button>
        ),
      });
    },
  });

  // const {
  //   data: receipt,
  //   isLoading: isPending,
  //   isSuccess,
  // } = useWaitForTransaction({ hash: contractData?.hash });

  function onSubmit(data: ContractFunction) {
    const allValues = data.inputs.map((input) => {
      let value: any = input.value;
      if (input.type.startsWith("uint")) value = BigInt(input.value);
      if (input.type === "bytes") value = stringToBytes(input.value as any);
      if (input.type === "address[]") value = input.value.split(",");
      return value;
    });
    write({
      args: allValues,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-6 container pb-10 max-w-2xl"
      >
        <div className="py-6 px-8 rounded-lg border border-border">
          <div className="mb-6 grid gap-1">
            <H3 className="">{data.name}</H3>
            <Subtle>{data.description}</Subtle>
          </div>
          <div className="grid gap-1 mb-2">
            {data.inputs.map((input, fieldIndex) => {
              return (
                <FormField
                  key={input.id}
                  control={form.control}
                  name={`inputs.${fieldIndex}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between items-end">
                        {input.name}
                        <Badge variant="secondary">{input.type}</Badge>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={input.name}
                          {...field}
                          value={field.value ? field.value : ""}
                        />
                      </FormControl>
                      <FormDescription>{input.description}</FormDescription>
                    </FormItem>
                  )}
                />
              );
            })}
          </div>
          {isConnected ? (
            <Button
              disabled={isLoading}
              size="lg"
              type="submit"
              className="w-full mt-1"
            >
              <Send className="w-4 mr-2" />
              {isLoading ? "Check Wallet" : data.name}
            </Button>
          ) : (
            <Connect />
          )}
        </div>
      </form>
    </Form>
  );
}
