require("dotenv/config");
const { GoogleSpreadsheet } = require("google-spreadsheet");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('items').del();
  
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS_ID);
  doc.useApiKey(process.env.GOOGLE_API_KEY);
  await doc.loadInfo();
  const tapestrySheet = doc.sheetsByIndex[0];
  const tapestryRows = await tapestrySheet.getRows();
  const tapestryIds = tapestryRows.map((x) => x.id);
  const itemsSheet = doc.sheetsByIndex[1];
  const itemsRows = await itemsSheet.getRows();
  return Promise.all(itemsRows.filter(x => tapestryIds.includes(x.tapestryId)).map(async (x) => {
    return knex('items').insert([
      {
        tapestryId: x.tapestryId,
        id: x.id,
        title: x.title,
        content: x.content,
        url: x.url,
        type: x.type,
        x: x.x,
        y: x.y,
        width: x.width,
        height: x.height,
        linksTo: x.linksTo ? x.linksTo.split(",") : [],
        hideTitle: x.hideTitle === "TRUE",
        thumbnail: x.thumbnail,
        controlList: x.controlList ? JSON.parse(x.controlList) : [],
      }
    ]).catch(err => {
      console.log(err);
      throw err;
    });
  }));
};
