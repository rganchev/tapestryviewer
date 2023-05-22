import { Tapestry } from "~/../models/Tapestry";

export const action = async ({request}) => {
  try {
    switch (request.method) {
      case "POST":
        const tapestry = await request.json();
        try {
          const addedTapestry = await Tapestry.query().insert(tapestry);
          return {
            statusCode: 200,
            body: JSON.stringify({
              message: `POST Success - added tapestry id ${addedTapestry.id}`,
              id: addedTapestry.id,
            }),
          };
        }
        catch(err) {
          return {
            statusCode: 500,
            body: "neither tapestry nor body!",
          };
        }
      default:
        return {
          statusCode: 500,
          body: "unrecognized HTTP Method, must be POST",
        };
    }
  } catch (err) {
    console.error("error ocurred in processing ", request.url);
    console.error(err);
    return {
      statusCode: 500,
      body: err.toString(),
    };
  }
};
