import { API_URL } from "~/lib/api";
import { notFound } from "next/navigation";
import { H2 } from "~/components/typography";
import { Button } from "~/components/ui/button";
import { Copy, ExternalLink, Save, Trash } from "lucide-react";
import EditPageForm from "./edit-page-form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

export default async function Page({ params }: { params: { id: string } }) {
  const url = new URL(`${API_URL}/page`);
  url.searchParams.append("page_id", params.id);
  try {
    const pageData = (await fetch(url, {
      cache: "no-store",
    }).then((res) => res.json())) as PageData;
    return (
      <div className="w-full mx-auto">
        <div className="sticky z-40 top-0 bg-white mb-6 pb-6 pt-6 border-b">
          <div className="container flex gap-20 items-center justify-between">
            <div>
              <H2 className="border-b-0">Page settings</H2>
              <p className="text-slate-500">
                Adjust function and field names, pre-fill default data or hide
                useless fields
              </p>
            </div>
            <TooltipProvider delayDuration={100}>
              <div className="flex gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button type="submit" form="edit-form">
                      <Save className="w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="m-2">Save updates</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">
                      <Copy className="w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="m-2">
                    Copy page link
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">
                      <ExternalLink className="w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="m-2">Show page</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="destructive">
                      <Trash className="w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="m-2">Delete page</TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </div>
        </div>
        <EditPageForm data={pageData} />
      </div>
    );
  } catch {
    notFound();
  }
}
