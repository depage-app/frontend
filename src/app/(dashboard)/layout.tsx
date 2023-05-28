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
            <div className="">
              <Button asChild variant="ghost">
                <Link href="/" className="">
                  Home
                </Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="/find-contract" className="">
                  Find contract
                </Link>
              </Button>
            </div>
          </div>
          <HeaderAccount />
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
