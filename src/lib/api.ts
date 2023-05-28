import { useQuery } from "@tanstack/react-query";

export const API_URL = "https://api.depage.app";

type UsePageOptions = {
  page_id: string;
};

export const usePage = ({ page_id }: UsePageOptions) => {
  const url = new URL(`${API_URL}/page`);

  url.searchParams.append("page_id", page_id);

  return useQuery({
    queryKey: [`page-${page_id}`],
    queryFn: async () => {
      const data = await fetch(url).then((res) => res.json());
      return data;
    },
  });
};
