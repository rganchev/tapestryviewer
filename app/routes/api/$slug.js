import { json } from "@remix-run/node";
import invariant from "tiny-invariant";
import { getTapestryFromSlug } from "~/tapestryData";

// This sends back JSON data for a given tapestry.

export const loader = async ({ params }) => {
  invariant(params.slug, "expected params.slug");
  const tapestry = await getTapestryFromSlug(params.slug);

  if (!tapestry) {
    console.log("tapestry not found");
    throw new Response("Tapestry not found", { status: 404 });
  }

  return json(tapestry);
};
