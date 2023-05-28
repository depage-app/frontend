import { API_URL } from "~/lib/api";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = (await request.json()) as PageData;
  console.log(data);

  try {
    const result = await fetch(`${API_URL}/page`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
      body: JSON.stringify({
        page_id: data.id,
        name: data.name,
        description: data.description,
        config: data.config,
      }),
    }).then((res) => res.json());
    return NextResponse.json({ res: result });
  } catch (error) {
    return NextResponse.json({ error: true, data: error });
  }
}

export function GET() {
  return NextResponse.json({ data: "works" });
}
