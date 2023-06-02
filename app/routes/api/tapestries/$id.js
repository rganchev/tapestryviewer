import { Tapestry } from "~/db-models/Tapestry";
import { json } from "@remix-run/node";

export const loader = async ({ params }) => {
  const tapestry = await Tapestry.query().findById(params.id);

  if (!tapestry) {
    throw json("Tapestry not found", { status: 404 });
  }
 
  return json(tapestry);
};

export const action = async ({request, params}) => {

  switch (request.method) {
    case "PUT":
      try {
        const tapestry = await request.json();
        const id = params.id;
        tapestry.id = id;
        const numUpdated = await Tapestry.query().findById(id).patch(tapestry);
        if (numUpdated === 0) {
          console.log("This tapestry doesn't exist!", id);
        }
        return json({ message: "PUT is a success!" });
      } catch(err) {
        console.log(err);
        throw json("PUT is a failure!", {status: 500 })
      }
    case "DELETE":
      try {
        await Tapestry.query().deleteById(id);
        return json({ message: "DELETE is a success!" }); 
      } catch(err) {
        throw json("DELETE is a failure!", {status: 500 });
      }
    default:
      throw json("unrecognized HTTP Method, must be one of PUT/DELETE", {status: 500});
  }
};
