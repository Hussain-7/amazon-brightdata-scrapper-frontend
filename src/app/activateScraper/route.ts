import { NextApiRequest } from "next";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  return new Response("If you want to activate scrapper send a post request!", {
    status: 200,
  });
}

export async function POST(req: Request, res: Response) {
  const { search } = await req.json();
  if (!search) return new Response("Search is required!", { status: 400 });

  const response = await fetch(
    `https://api.brightdata.com/dca/trigger?collector=c_lfvkcu202gz31xwzg4&queue_next=1`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.BRIGHTDATA_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        search,
      }),
    }
  );

  const data = await response.json();

  console.log("data", data);
  const { collection_id, start_eta } = data;

  return new Response(
    JSON.stringify({
      collection_id,
      start_eta,
    }),
    {
      status: 200,
    }
  );
}
