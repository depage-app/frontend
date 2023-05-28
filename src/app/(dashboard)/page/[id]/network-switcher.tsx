"use client";

import { useNetwork } from "wagmi";
import { NetworkSwitcher } from "~/components/network-switcher";

export default function NetworkSwitcherWarning({
  contract_chain_id,
}: {
  contract_chain_id: number;
}) {
  const { chain, chains } = useNetwork();
  if (!chain || chain?.id === contract_chain_id) return null;
  return (
    <div className="max-w-xl mx-auto  p-4 rounded-xl border-2 border-red-400 mt-10">
      <strong className="inline-block mb-2 text-red-600">
        Switch your network to make transactions
      </strong>
      <p className="mb-4">
        Your are currently in <strong>{chain?.name}</strong>, please switch to{" "}
        <strong>
          {chains.find((listChain) => listChain.id === contract_chain_id)
            ?.name || contract_chain_id}
        </strong>
      </p>
      <NetworkSwitcher />
    </div>
  );
}
