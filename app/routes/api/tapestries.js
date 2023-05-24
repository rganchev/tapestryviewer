import { Tapestry } from "~/../models/Tapestry";
import { json } from "@remix-run/node";

export const action = async ({request}) => {
  switch (request.method) {
    case "POST":
      try {
        const tapestry = await request.json();
        const addedTapestry = await Tapestry.query().insert(tapestry);
        return json({
          message: `POST Success - added tapestry id ${addedTapestry.id}`,
          id: addedTapestry.id,
        });
      }
      catch(err) {
        console.log(err);
        throw json("POST is a failure!", {status: 500 });
      }
    default:
      throw json("unrecognized HTTP Method, must be POST", {status: 500});
  }
};
