"use client";

import { useNetwork, useSwitchNetwork } from "wagmi";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "./ui/button";

export function NetworkSwitcher() {
  const { chain } = useNetwork();
  const { chains, isLoading, switchNetwork } = useSwitchNetwork({
    onError(error) {
      console.log(error.message);
    },
  });

  return (
    <>
      {switchNetwork ? (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="w-full">
                Switch network
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Switch to</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {chains
                .filter((listChain) => listChain.id !== chain?.id)
                .map((chain) => (
                  <DropdownMenuItem
                    key={chain.id}
                    onClick={() => switchNetwork(chain.id)}
                  >
                    <span>{chain.name}</span>
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Switch to:{" "}
          {chains.map((x) =>
            x.id === chain?.id ? null : (
              <button key={x.id} onClick={() => switchNetwork(x.id)}>
                {x.name}
                {isLoading && x.id === pendingChainId && " (switching)"}
              </button>
            )
          )} */}
        </div>
      ) : null}
    </>
  );
}
