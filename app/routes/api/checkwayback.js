import { json } from "@remix-run/node";
import fetch from "node-fetch";

// this checks if a URL is available at the internet archive

export const action = async ({ request }) => {
  const url = (await request.json()).url;
  const theUrl = `http://archive.org/wayback/available?url=${url}`;

  try {
    const response = await fetch(theUrl);
    const responseJson = await response.json();
    const closestSnapshot = responseJson.archived_snapshots?.closest;
    const outUrl = closestSnapshot?.available
      ? closestSnapshot.url.replace("http://", "https://")
      : url;
    return json(outUrl);
  } catch (err) {
    console.error("Error: ", err);
    throw json({ error: err.message }, { status: err.statusCode || 500 });
  }
};
