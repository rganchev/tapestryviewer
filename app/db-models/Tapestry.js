import { Model } from 'objection';
import { Item } from './Item'; 

export class Tapestry extends Model {
  static get tableName() {
    return 'tapestries';
  }

  static get relationMappings() {
    return {
      items: {
        relation: Model.HasManyRelation,
        modelClass: Item,
        join: {
          from: 'tapestries.id',
          to: 'items.tapestryId'
        }
      }
    }
  }
}