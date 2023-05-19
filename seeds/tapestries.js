require("dotenv/config");
const { GoogleSpreadsheet } = require("google-spreadsheet");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('tapestries').del();

  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS_ID);
  doc.useApiKey(process.env.GOOGLE_API_KEY);
  await doc.loadInfo();
  const tapestrySheet = doc.sheetsByIndex[0];
  const tapestryRows = await tapestrySheet.getRows();
  return Promise.all(tapestryRows.map(async (x) => {
    return knex('tapestries').insert([
      {
        id: x.id,
        title: x.title,
        slug: x.slug,
        author: x.author,
        forkable: Boolean(x.forkable === "TRUE"),
        background: x.background,
        gridUnitSize: Number(x.gridUnitSize),
        gridGap: Number(x.gridGap),
        hideOnFront: Boolean(x.hideOnFront === "TRUE"),
        initialView: Boolean(x.initialView === "TRUE"),
        initialX: Number(x.initialX),
        initialY: Number(x.initialY),
        defaultZoom: Number(x.defaultZoom) || 1,
      }
    ]);
  }));
  // await knex('tapestries').insert([
  //   {
  //     id: 'microscopes-are-prudent',
  //     title: 'Microscopes are Prudent',
  //     slug: 'microscopes-are-prudent',
  //     author: 'Dan Visel',
  //     forkable: true,
  //     background: 'none',
  //     gridUnitSize: 300,
  //     gridGap: 150,
  //     hideOnFront: null,
  //     initialView: null,
  //     initialX: null,
  //     initialY: null,
  //     defaultZoom: null
  //   },
  // ]);
};
