import { json } from "@remix-run/node";
import fetch from "node-fetch";

// this checks if a URL is available at the internet archive

export const action = async ({ request }) => {
  const url = (await request.json()).url;
  const theUrl = `https://archive.org/services/search/v1/scrape?fields=identifier&q=collection%3A${url}`;

  try {
    const response = await fetch(theUrl);
    const responseJson = await response.json();
    // this should return
    // {"items":[{"identifier":"2001073DWorldI14"},{"identifier":"2002083DWorldI28"},{"identifier":"3DWorldDecember2017UK"}],"count":3,"total":3}
    console.log(responseJson);
    console.log(
      responseJson.items?.length ? "Found items!" : "No items found!"
    );

    const outUrl = responseJson.items?.map((x) => x.identifier) || [];
    return json(outUrl);
  } catch (err) {
    console.error("Error: ", err);
    throw json({ error: err.message }, { status: err.statusCode || 500 });
  }
};
