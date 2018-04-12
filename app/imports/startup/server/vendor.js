import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Vendors } from '../../api/vendor/vendor.js';

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Vendor', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Vendors.find({ owner: username });
  }
  return this.ready();
});