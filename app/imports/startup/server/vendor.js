import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Vendors } from '../../api/vendor/vendor';

function addData(data) {
  console.log(` Adding: ${data.userName} (${data.owner})`);
  Vendors.insert(data);
}

/** Initialize the collection if empty. */
if (Vendors.find().count() === 0) {
  if (Meteor.settings.defaultVendors) {
    console.log('Creating default vendor.');
    Meteor.settings.defaultVendors.map(data => addData(data));
  }
}

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Vendor', function publish() {
    return Vendors.find();
  return this.ready();
});
