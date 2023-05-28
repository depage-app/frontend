import { H2, Subtle } from "~/components/typography";
import InitializeForm from "./initialize-form";
import { API_URL } from "~/lib/api";

export const metadata = {
  title: "Depage | Create",
};

export default async function Page() {
  const networks: { data: Network[] } = await fetch(`${API_URL}/chains`, {
    cache: "no-cache",
  }).then((res) => res.json());
  return (
    <div className="container py-10">
      <div className="w-full max-w-lg mx-auto">
        <div className="mt-4 mb-12 text-center">
          <H2 className=" border-b-0">Create your page</H2>
          <Subtle>Automatically create UI for your smart contract</Subtle>
        </div>
        <InitializeForm networks={networks.data} />
      </div>
    </div>
  );
}
