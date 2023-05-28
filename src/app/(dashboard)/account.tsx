"use client";

import { useAccount, useNetwork } from "wagmi";
import { Account } from "~/components/account";
import { Connect } from "~/components/connect";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import { ChevronDown } from "lucide-react";
import { NetworkSwitcher } from "~/components/network-switcher";

export default function HeaderAccount() {
  const { isConnected } = useAccount();

  const { chain } = useNetwork();

  if (!isConnected) return <Connect />;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Account />
          <ChevronDown className="ml-2 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="mb-2">
          Connected to <strong>{chain?.name ?? chain?.id}</strong>
          {chain?.unsupported && " (unsupported)"}
        </div>
        <NetworkSwitcher />
        <hr className="my-4" />
        <Connect />
      </PopoverContent>
    </Popover>
  );
}
