/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('tapestries', function (table) {
      table.string('id', 255).notNullable().primary();
      table.string('title', 255).notNullable();
      table.string('slug', 255).notNullable();
      table.string('author', 255).notNullable();
      table.boolean('forkable').notNullable();
      table.string('background', 255).notNullable();
      table.integer('gridUnitSize').notNullable();
      table.integer('gridGap').notNullable();
      table.boolean('hideOnFront');
      table.boolean('initialView');
      table.integer('initialX');
      table.integer('initialY');
      table.float('defaultZoom');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTable('tapestries');
};
