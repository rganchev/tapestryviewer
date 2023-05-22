import { Tapestry } from "~/../models/Tapestry";

export const action = async ({request, params}) => {
  try {
    switch (request.method) {
      case "GET":
        try {
          const tapestry = Tapestry.query().findById(id);
          return {
            statusCode: 200,
            body: JSON.stringify(tapestry),
          };
        } catch(err) {
          return {
            statusCode: 500,
            body: "GET is a failure!",
          };
        }
      case "PUT":
        try {
          const tapestry = await request.json();
          const id = params.id;
          tapestry.id = id;
          const numUpdated = await Tapestry.query().findById(id).patch(tapestry);
          if (numUpdated === 0) {
            console.log("This tapestry doesn't exist!", id);
          }
          return {
            statusCode: 200,
            body: JSON.stringify({ message: "PUT is a success!" }),
          };
        } catch(err) {
          return {
            statusCode: 500,
            body: "PUT is a failure!",
          };
        }
      case "DELETE":
        try {
          await Tapestry.query().deleteById(id);
        } catch(err) {
          return {
            statusCode: 500,
            body: "DELETE is a failure!",
          };
        }
      default:
        return {
          statusCode: 500,
          body: "unrecognized HTTP Method, must be one of GET/PUT/DELETE",
        };
    }
  } catch (err) {
    console.error("error ocurred in processing ", request);
    console.error(err);
    return {
      statusCode: 500,
      body: err.toString(),
    };
  }
};
