import { H2 } from "~/components/typography";
import InitializeForm from "./initialize-form";
import { API_URL } from "~/lib/api";

export const metadata = {
  title: "Depage | Create",
};

export default async function Page() {
  const networks: { data: Network[] } = await fetch(`${API_URL}/chains`).then(
    (res) => res.json()
  );
  return (
    <div className="container py-20">
      <div className="w-full max-w-lg mx-auto">
        <H2 className="text-center mt-4 mb-12 border-b-0">
          Find your contract
        </H2>
        <InitializeForm networks={networks.data} />
      </div>
    </div>
  );
}
