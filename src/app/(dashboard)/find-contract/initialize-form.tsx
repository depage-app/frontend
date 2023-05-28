"use client";

import { Input } from "~/components/ui/input";
import NetworkSelect from "./network-select";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { Suspense } from "react";
import { useAccount } from "wagmi";
import { Connect } from "~/components/connect";
import { Pencil } from "lucide-react";
import { API_URL } from "~/lib/api";
import { useToast } from "~/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Subtle } from "~/components/typography";

const formSchema = z.object({
  smart_contract_address: z
    .string()
    .min(2, {
      message: "Address must be at least 2 characters.",
    })
    .max(50, {
      message: "Address must be up to 50 characters.",
    }),
  chain: z.string(),
});

type FormData = z.infer<typeof formSchema>;

export default function InitializeForm({ networks }: { networks: Network[] }) {
  const { isConnected, address } = useAccount();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      smart_contract_address: "",
      chain: "polygon",
    },
  });

  async function onSubmit(values: FormData) {
    // console.log(values, address);
    if (!address) {
      toast({
        title: "Connect your wallet first <3",
      });
      return;
    }

    const url = new URL(`${API_URL}/page`);

    url.searchParams.append(
      "smart_contract_address",
      values.smart_contract_address
    );
    url.searchParams.append("chain", values.chain);
    url.searchParams.append("creator_address", address || "");

    try {
      const loadingToast = toast({
        title: "Looking up for a contract...",
      });

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      if (!response.id) {
        loadingToast.dismiss();
        throw new Error("Might be invalid params");
      }

      if (!response.config.length) {
        loadingToast.dismiss();
        toast({
          variant: "destructive",
          title: "Contract not found",
          description: "Might be incorrect chain",
        });
        return;
      }

      loadingToast.dismiss();
      toast({
        title: "Everything is fine",
        description: "Redirecting to the edit page...",
      });
      router.push(`/edit-page/${response.id}`);
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Contract address might be wrong",
      });
    }
  }
  return (
    <>
      <Button
        onClick={() =>
          onSubmit({
            smart_contract_address:
              "0x5B0Fe25Ba056C32fF467D6DeA42aDbE3C0a241Be",
            chain: "polygon",
          })
        }
        variant="outline"
        size="lg"
        className="w-full"
      >
        Create from our NFT mint example contract
      </Button>
      <div className="relative my-5 text-center">
        <div className="absolute top-1/2 -translate-y-1/2 w-full h-[1px] bg-border" />
        <span className="relative bg-white py-1 px-3 text-sm text-slate-600">
          or create your own
        </span>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
          <FormField
            control={form.control}
            name="chain"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Network</FormLabel>
                <FormControl>
                  <Suspense>
                    <NetworkSelect
                      networks={networks}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </Suspense>
                </FormControl>
                <FormDescription>Select your network</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="smart_contract_address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="0xEf1c6E67703c7BD7107eed8303Fbe6EC2554BF6B"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Enter your address</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {isConnected ? (
            <Button size="lg" type="submit" className="w-full mt-1">
              <Pencil className="w-5 mr-2" />
              Create a configuration
            </Button>
          ) : (
            <Connect />
          )}
        </form>
      </Form>
    </>
  );
}
