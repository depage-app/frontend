import { notFound } from "next/navigation";
import { H2 } from "~/components/typography";
import { API_URL } from "~/lib/api";
import PageForm from "./form";
import { NetworkSwitcher } from "~/components/network-switcher";
import NetworkSwitcherWarning from "./network-switcher";

export default async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const url = new URL(`${API_URL}/page`);
  url.searchParams.append("page_id", params.id);

  try {
    const pageData = (await fetch(url, {
      cache: "no-store",
    }).then((res) => res.json())) as PageData;

    return (
      <>
        <div className="py-16">
          <div className="container text-center">
            <H2 className="border-b-0">{pageData.name}</H2>
            <p className="text-slate-500">{pageData.description}</p>
            <NetworkSwitcherWarning contract_chain_id={pageData.chain_id} />
          </div>
        </div>
        {pageData.config.map((config) =>
          config.hidden ? null : (
            <PageForm
              key={config.id}
              data={config}
              abi={pageData.abi}
              chain_id={pageData.chain_id}
              contract_address={pageData.contract_address}
            />
          )
        )}
      </>
    );
  } catch {
    notFound();
  }
}
