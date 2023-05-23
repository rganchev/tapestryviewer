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
        forkable: x.forkable === "TRUE",
        background: x.background,
        gridUnitSize: x.gridUnitSize,
        gridGap: x.gridGap,
        hideOnFront: x.hideOnFront === "TRUE",
        initialView: x.initialView === "TRUE",
        initialX: x.initialX,
        initialY: x.initialY,
        defaultZoom: x.defaultZoom || 1,
      }
    ]);
  }));
};
