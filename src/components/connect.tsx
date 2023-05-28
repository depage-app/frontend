"use client";

import { BaseError } from "viem";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import walletConnectIcon from "./wallet-connect-icon.svg";
import metamaskIcon from "./metamask-icon.svg";
import Image from "next/image";

export function Connect() {
  const { connector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div>
      <div className="flex gap-2">
        {isConnected ? (
          <Button
            type="button"
            variant="destructive"
            className="w-full"
            onClick={() => disconnect()}
          >
            Disconnect from {connector?.name}
          </Button>
        ) : (
          connectors
            .filter((x) => x.ready && x.id !== connector?.id)
            .map((x) => (
              <Button
                type="button"
                variant="outline"
                className="w-full"
                key={x.id}
                onClick={() => connect({ connector: x })}
              >
                {x.id === "walletConnect" && (
                  <Image
                    className="mr-2"
                    width={20}
                    height={20}
                    src={walletConnectIcon}
                    alt="WalletConnect"
                  />
                )}
                {x.id === "metaMask" && (
                  <Image
                    className="mr-2"
                    width={20}
                    height={20}
                    src={metamaskIcon}
                    alt="MetaMask"
                  />
                )}
                {x.name}
                {isLoading && x.id === pendingConnector?.id && (
                  <Loader2 className="w-4 animate-spin ml-2" />
                )}
              </Button>
            ))
        )}
      </div>

      {error && <div>{(error as BaseError).shortMessage}</div>}
    </div>
  );
}
