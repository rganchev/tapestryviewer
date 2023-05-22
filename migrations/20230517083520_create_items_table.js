/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('items', function (table) {
      table.string('id', 255).notNullable();
      table.string('title', 255).notNullable();
      table.string('type', 255).notNullable();
      table.string('content').notNullable();
      table.string('url');
      table.integer('x').notNullable();
      table.integer('y').notNullable();
      table.integer('width').notNullable();
      table.integer('height').notNullable();
      table.string('linksTo');
      table.boolean('hideTitle');
      table.string('thumbnail');
      table.string('controlList');
      table.string('tapestryId').notNullable();

      table.foreign('tapestryId')
        .references('tapestries.id');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTable('items');
};
