import { NextApiRequest } from "next";
import { cookies } from "next/headers";
import { adminDb } from "../../../firebaseAdmin";
import admin from "firebase-admin";
export async function GET(request: Request) {
  return new Response("If you want to activate scrapper send a post request!", {
    status: 200,
  });
}

export async function POST(req: Request) {
  try {
    const { search } = await req.json();
    if (!search) return new Response("Search is required!", { status: 400 });

    // Get response from brightdata scrapper that we have created
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
    console.log("response", response);

    const data = await response.json();

    console.log("data", data);
    const { collection_id, start_eta } = data;

    // Save the response in our firebase database
    await adminDb.collection("searches").doc(collection_id).set({
      search,
      start_eta,
      status: "pending",
      updatedAt: admin.firestore.Timestamp.now(),
    });
    return new Response(
      JSON.stringify({
        collection_id,
        start_eta,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("error", error.message);
    return new Response("Something went wrong!", { status: 500 });
  }
}
