import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

Meteor.methods({
  addVendor: function () {
    console.log('hi');
    // const account = Accounts.findUserByEmail(email);
    // Roles.addUsersToRoles(account, 'vendor');
    // return 1;
  },
});
