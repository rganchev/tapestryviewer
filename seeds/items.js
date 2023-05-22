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
  const itemsSheet = doc.sheetsByIndex[1];
  const itemsRows = await itemsSheet.getRows();
  return Promise.all(itemsRows.map(async (x) => {
    return knex('items').insert([
      {
        tapestryId: x.tapestryId,
        id: x.id,
        title: x.title,
        content: x.content,
        url: x.url,
        type: x.type,
        x: Number(x.x),
        y: Number(x.y),
        width: Number(x.width),
        height: Number(x.height),
        linksTo: x.linksTo ? x.linksTo.split(",") : [],
        hideTitle: Boolean(x.hideTitle === "TRUE"),
        thumbnail: x.thumbnail,
        controlList: x.controlList ? JSON.parse(x.controlList) : [],
      }
    ]);
  }));
  // await knex('items').insert([
  //   {
  //     id: 'f9f03a05-eb52-4d97-bba1-669ba669843b',
  //     tapestryId: 'microscopes-are-prudent',
  //     title: 'Introduction',
  //     type: 'textFrame',
  //     content: '<p>I went and searched the Internet Archive for Emily Dickinson&#x27;s poem &quot;Faith is a Fine Invention&quot; curious about how much diversity there might be in the results. For a very familiar poem, there&#x27;s a surprising amount of variation!</p>',
  //     url: null,
  //     x: 1,
  //     y: 1,
  //     width: 2,
  //     height: 1,
  //     linksTo: null,
  //     hideTitle: false,
  //     thumbnail: null,
  //     controlList: null,
  //   }
  // ]);
};
