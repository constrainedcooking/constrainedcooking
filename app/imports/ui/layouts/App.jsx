import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import ListRecipes from '../pages/ListRecipes';
import ListStuffAdmin from '../pages/ListStuffAdmin';
import AddStuff from '../pages/AddStuff';
import AddVendorItem from '../pages/AddVendorItem';
import AddRecipe from '../pages/AddRecipe';
import EditStuff from '../pages/EditStuff';
import ViewRecipe from '../pages/ViewRecipe';
import EditVendorItem from '../pages/EditVendorItem';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import ProfileView from '../pages/ProfileView';
import ProfileEdit from '../pages/ProfileEdit';
// import ProfileViewAdmin from '../pages/ProfileViewAdmin';
import ProfileListAdmin from '../pages/ProfileListAdmin';
import ProfileListViewAdmin from '../pages/ProfileListViewAdmin';
import ListVendor from '../pages/ListVendor';
import ListVendorView from '../pages/ListVendorView';
import ListVendorAll_Items from '../pages/ListVendorAll_Items';


/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
        <Router>
          <div>
            <NavBar/>
            <Switch>
              <Route exact path="/" component={Landing}/>
              <Route path="/signin" component={Signin}/>
              <Route path="/signup" component={Signup}/>
              <Route path="/list" component={ListRecipes}/>
              <ProtectedRoute path="/add" component={AddStuff}/>
              <VendorProtectedRoute path="/addvendoritem" component={AddVendorItem}/>
              <ProtectedRoute path="/listvendor" component={ListVendor}/>
              <ProtectedRoute path="/addrecipe" component={AddRecipe}/>
              <ProtectedRoute path="/editprofile/:_id" component={ProfileEdit}/>
              <ProtectedRoute path="/viewrecipe/:_id" component={ViewRecipe}/>
              <ProtectedRoute path="/editvendoritem/:_id" component={EditVendorItem}/>
              <AdminProtectedRoute path="/admin" component={ListStuffAdmin}/>
              <ProtectedRoute path="/signout" component={Signout}/>
              <ProtectedRoute path="/profileview" component={ProfileView}/>
              <AdminProtectedRoute path="/profilelistadmin" component={ProfileListAdmin}/>
              <AdminProtectedRoute path="/profileviewadmin/:_id" component={ProfileListViewAdmin}/>
              <ProtectedRoute path="/vendorList" component={ListVendor}/>
              <ProtectedRoute path="/vendorview/:_id" component={ListVendorView}/>
              <ProtectedRoute path="/listAllvendors" component={ListVendorAll_Items}/>
              <VendorProtectedRoute path="/vendoredit/:_id" component={EditVendorItem}/>
              <Route component={NotFound}/>
            </Switch>
            <Footer/>
          </div>
        </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ?
          (<Component {...props} />) :
          (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
      );
    }}
  />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
          const isLogged = Meteor.userId() !== null;
          const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
          return (isLogged && isAdmin) ?
              (<Component {...props} />) :
              (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
              );
        }}
    />
);

/**
 * VendorProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const VendorProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
          const isLogged = Meteor.userId() !== null;
          const isVendor = Roles.userIsInRole(Meteor.userId(), 'vendor');
          return (isLogged && isVendor) ?
              (<Component {...props} />) :
              (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
              );
        }}
    />
);

/** Require a component and location to be passed to each ProtectedRoute. */
ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

/** Require a component and location to be passed to each AdminProtectedRoute. */
AdminProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

/** Require a component and location to be passed to each VendorProtectedRoute. */
VendorProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

export default App;
