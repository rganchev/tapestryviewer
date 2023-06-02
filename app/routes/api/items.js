import { Item } from "~/db-models/Item";
import { json } from "@remix-run/node";

export const action = async ({request}) => {
  switch (request.method) {
    case "POST":
      try {
        const item = await request.json();
        const addedItem = await Item.query().insert(item);
        return json({
          message: `POST Success - added item id ${addedItem.id}`,
          id: addedItem.id
        });
      } catch(err) {
        console.log(err);
        throw json("POST is a failure!", {status: 500 });
      }
    default:
      throw json("unrecognized HTTP Method, must be POST", {status: 500});
  }
};
