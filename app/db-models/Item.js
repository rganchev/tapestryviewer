import { Model } from 'objection';

export class Item extends Model {
  static get tableName() {
    return 'items';
  }
}