import * as cheerio from "cheerio";
import { json } from "@remix-run/node"
import fetch from "node-fetch";

// this checks if a URL is available at the internet archive

export const action = async ({ request }) => {
  const url = (await request.json()).url;

  try {
    const response = await fetch(url);
    const html = await response.text();

    const $ = cheerio.load(html);

    // check if it's wikipedia
    // if so, get .mw-body-content, look in there
    const wikipediaMode = url.includes("wikipedia.org");
    const linkObjects = $(wikipediaMode ? "div.mw-body-content a" : "a");
    // this is a mass object, not an array

    console.log("Total links: ", linkObjects.length);

    const allowedLinks = Array.from(linkObjects).map(link => {
      const thisUrl = link.attribs.href;
      const isAnchor = thisUrl?.startsWith("#");
      const isWikipediaInternal = wikipediaMode && thisUrl?.includes("/w/");
      const isWikipedia = wikipediaMode && thisUrl?.includes("/wiki/"); // this is outlawing any Wikipedia internal link
      return !isAnchor && !isWikipediaInternal && !isWikipedia ? thisUrl : null;
    }).filter(link => !!link);

    console.log("Allowed links: ", allowedLinks.length);
    return json(allowedLinks);
  } catch (err) {
    console.error("Error: ", err);
    throw json({ error: err.message }, { status: err.statusCode || 500});
  }
};
