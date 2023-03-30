import { NextApiRequest } from "next";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  return new Response("If you want to activate scrapper send a post request!", {
    status: 200,
  });
}

type Body = {
  search: string;
};

export async function POST(req: NextApiRequest) {
  console.log(req.body);
  const search = req.body.search;
}
