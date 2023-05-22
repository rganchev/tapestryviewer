import { Item } from "~/../models/Item";

export const action = async ({request, params}) => {
  try {
    switch (request.method) {
      case "GET":
        try {
          const item = Item.query().findById(id);
          return {
            statusCode: 200,
            body: JSON.stringify(item),
          };
        } catch(err) {
          return {
            statusCode: 500,
            body: "GET is a failure!",
          };
        }
      case "PUT":
        try {
          const item = await request.json();
          const id = params.id;
          item.id = id;
          const numUpdated = await Item.query().findById(id).patch(item);
          if (numUpdated === 0) {
            await Item.query().insert(item);
          }
          return {
            statusCode: 200,
            body: JSON.stringify({ message: "PUT is a success!" }),
          };
        } catch(err) {
          console.log(err);
          return {
            statusCode: 500,
            body: "PUT is a failure!",
          };
        }
      case "DELETE":
        try {
          await Item.query().deleteById(id);
        } catch(err) {
          return {
            statusCode: 500,
            body: "DELETE is a failure!",
          };
        }
      default:
        return {
          statusCode: 500,
          body: "unrecognized HTTP Method, must be one of GET/POST/PUT/DELETE",
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
