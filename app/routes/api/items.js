import { Item } from "~/../models/Item";

export const action = async ({request}) => {
  try {
    switch (request.method) {
      case "POST":
        try {
          const item = await request.json();
          const addedItem = await Item.query().insert(item);
          return {
            statusCode: 200,
            body: JSON.stringify({
              message: `POST Success - added item id ${addedItem.id}`,
              id: addedItem.id
            }),
          };
        } catch(err) {
          return {
            statusCode: 500,
            body: "neither item nor body!",
          };
        }
      default:
        return {
          statusCode: 500,
          body: "unrecognized HTTP Method, must be POST",
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
