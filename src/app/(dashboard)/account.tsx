"use client";

import { useAccount } from "wagmi";
import { Account } from "~/components/account";
import { Connect } from "~/components/connect";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import { ChevronDown } from "lucide-react";

export default function HeaderAccount() {
  const { isConnected } = useAccount();
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
        <Connect />
      </PopoverContent>
    </Popover>
  );
}
