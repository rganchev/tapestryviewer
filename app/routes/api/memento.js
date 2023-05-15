import { json } from "@remix-run/node";
import fetch from "node-fetch";

export const action = async ({ request }) => {
  const url = (await request.json()).url;
  const theUrl = `http://web.archive.org/web/timemap/json/${url}`;

  try {
    const response = await fetch(theUrl);
    const responseJson = await response.json();
    const dates = responseJson.slice(1).map((x) => x[1])
    return json(dates);
  } catch (err) {
    console.error("Error: ", err);
    throw json({ error: err.message }, { status: err.statusCode || 500 });
  }
};
