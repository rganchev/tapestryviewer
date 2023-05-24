/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('items', function (table) {
      table.string('id').notNullable();
      table.string('title').notNullable();
      table.string('type').notNullable();
      table.text('content').notNullable();
      table.string('url');
      table.integer('x').notNullable();
      table.integer('y').notNullable();
      table.integer('width').notNullable();
      table.integer('height').notNullable();
      table.text('linksTo');
      table.boolean('hideTitle');
      table.text('thumbnail');
      table.text('controlList');
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
