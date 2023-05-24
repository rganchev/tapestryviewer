import { Item } from "~/db-models/Item";
import { json } from "@remix-run/node";

export const loader = async ({ params }) => {
  const item = await Item.query().findById(params.id);

  if (!item) {
    throw json("Item not found", { status: 404 });
  }
 
  return json(item);
};

export const action = async ({request, params}) => {
  switch (request.method) {
    case "PUT":
      try {
        const item = await request.json();
        const id = params.id;
        item.id = id;
        const numUpdated = await Item.query().findById(id).patch(item);
        if (numUpdated === 0) {
          await Item.query().insert(item);
        }
        return json({ message: "PUT is a success!" });
      } catch(err) {
        console.log(err);
        throw json("PUT is a failure!", {status: 500 });
      }
    case "DELETE":
      try {
        await Item.query().deleteById(params.id);
        return json({ message: "DELETE is a success!" }); 
      } catch(err) {
        console.log(err);
        throw json("DELETE is a failure!", {status: 500 });
      }
    default:
      throw json("unrecognized HTTP Method, must be one of PUT/DELETE", {status: 500});
  }
};
