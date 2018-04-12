import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Recipes } from '../../api/recipe/recipe.js';

// /** Initialize the database with a default data document. */
// function addRecipes(data) {
//   console.log(`  Adding: ${data.name} (${data.creator})`);
//   Recipes.insert(data);
// }
//
// /** Initialize the collection if empty. */
// if (Recipes.find().count() === 0) {
//   if (Meteor.settings.defaultRecipes) {
//     console.log('Creating default data.');
//     Meteor.settings.defaultRecipes.map(data => addRecipes(data));
//   }
// }

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('Recipe', function publish() {

  return Recipes.find();

  return this.ready();
});
