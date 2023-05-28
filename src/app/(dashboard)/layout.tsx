import Link from "next/link";
import HeaderAccount from "./account";
import { Button } from "~/components/ui/button";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <header className="py-4 border-b">
        <div className="flex items-center justify-between container">
          <div className="flex items-center gap-20">
            <span className="font-black text-xl">DePage</span>
          </div>
          <div className="flex items-center">
            <Button asChild variant="outline">
              <Link href="/find-contract" className="">
                Create new page
              </Link>
            </Button>
            <span className="block mx-4 h-[30px] w-[1px] bg-border" />
            <HeaderAccount />
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
