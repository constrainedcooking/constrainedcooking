import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Recipes = new Mongo.Collection('Recipes');

/** Create a schema to constrain the structure of documents associated with this collection. */
const RecipeSchema = new SimpleSchema({
  name: String,
  image: String,
  description: String,
  time: Number,
  servings: Number,
  tags: { type: Array, optional: true }, 'tags.$':{ type: String },
  ingredients: { type: Array, minCount: 1, optional: false },
  'ingredients.$': { type: Object, blackbox: true },
  directions: { type: Array, minCount: 1 },
  'directions.$': { type: String },
  creator: String,
}, {
  clean: {
    filter: true,
    autoConvert: true,
    removeEmptyStrings: true,
    trimStrings: true,
    getAutoValues: true,
    removeNullsFromArrays: true,
  },
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Recipes.attachSchema(RecipeSchema);

/** Make the collection and schema available to other code. */
export { Recipes, RecipeSchema };
