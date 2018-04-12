import React from 'react';
import { Recipe, RecipeSchema } from '/imports/api/recipe/recipe';
import { Grid, Segment, Header, Button, Form, TextArea } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import NumField from 'uniforms-semantic/NumField';
import SelectField from 'uniforms-semantic/SelectField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';

/** Renders the Page for adding a document. */
class AddRecipe extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.formRef = null;
    this.state = {
      name: '',
      ingredients: [{name: '', amount: ''}],
      equipment: [{name: ''}],
      directions: [{step:''}],
    };
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Add succeeded' });
      this.formRef.reset();
    }
  }

  /** Beginning of Ingredient functions */
  handleIngredientNameChange = (idx) => (evt) => {
    const newIngredients = this.state.ingredients.map((ingredient, sidx) => {
      if (idx !== sidx) return ingredient;
      return { ...ingredient, name: evt.target.value };    //what does "..." do?
    });

    this.setState({ ingredients: newIngredients });
  }

  handleIngredientAmountChange = (idx) => (evt) => {
    const newIngredients = this.state.ingredients.map((ingredient, sidx) => {
      if (idx !== sidx) return ingredient;
      return { ...ingredient, amount: evt.target.value };
    });

    this.setState({ ingredients: newIngredients });
  }

  handleAddIngredient = () => {
    this.setState({
      ingredients: this.state.ingredients.concat([{ name: '' , amount: ''}])
    });
  }

  handleRemoveIngredient = (idx) => () => {
    this.setState({
      ingredients: this.state.ingredients.filter((i, sidx) => idx !== sidx)
    });
  }

  /** Beginnning of Equipment functions */
  handleEquipmentChange = (idx) => (evt) => {
    const newEquipments = this.state.equipment.map((equip, sidx) => {
      if (idx !== sidx) return equip;
      return { ...equip, name: evt.target.value };
    });

    this.setState({ equipment: newEquipments });
  }

  handleAddEquipment = () => {
    this.setState({
      equipment: this.state.equipment.concat([{ name: ''}])
    });
  }

  handleRemoveEquipment = (idx) => () => {
    this.setState({
      equipment: this.state.equipment.filter((e, sidx) => idx !== sidx)
    });
  }

  /** Beginnning of Direction functions */
  handleDirectionChange = (idx) => (evt) => {
    const newDirections = this.state.directions.map((direction, sidx) => {
      if (idx !== sidx) return direction;
      return { ...direction, step: evt.target.value };
    });

    this.setState({ directions: newDirections });
  }

  handleAddDirection = () => {
    this.setState({
      directions: this.state.directions.concat([{ step: ''}])
    });
  }

  handleRemoveDirection = (idx) => () => {
    this.setState({
      directions: this.state.directions.filter((d, sidx) => idx !== sidx)
    });
  }

  /** On submit, insert the data. */
  submit(data) {
    const { name, description } = data;
    const { ingredients, equipment, directions } = this.state;
    const creator = Meteor.user().username;
    Recipes.insert({ name, description, ingredients, equipment, directions, creator }, this.insertCallback);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Add Recipe</Header>
            <AutoForm ref={(ref) => { this.formRef = ref; }} schema={RecipeSchema} onSubmit={this.submit}>
              <Segment>
                <TextField name='name'/>
                <TextField name='description'/>
                <Header as="h4">Ingredients</Header>
                {this.state.ingredients.map((ingredient, idx) => (
                <div>
                  <Form.Group>
                    <Form.Input placeholder='name' value={ingredient.name} onChange={this.handleIngredientNameChange(idx)}/>
                    <Form.Input placeholder='ie. 2 tsp' value={ingredient.amount} onChange={this.handleIngredientAmountChange(idx)}/>
                    <Button onClick={this.handleRemoveIngredient(idx)} size='small'>Remove</Button>
                  </Form.Group>
                </div>
                ))}
                <Button onClick={this.handleAddIngredient} size='small'>Add Ingredient</Button>
                <Header as="h4">Equipment</Header>
                {this.state.equipment.map((equip, idx) => (
                    <div>
                      <Form.Group>
                        <Form.Input placeholder='name' value={equip.name} onChange={this.handleEquipmentChange(idx)}/>
                        <Button onClick={this.handleRemoveEquipment(idx)} size='small'>Remove</Button>
                      </Form.Group>
                    </div>
                ))}
                <Button onClick={this.handleAddEquipment} size='small'>Add Equipment</Button>
                <Header as="h4">Directions</Header>
                {this.state.directions.map((direction, idx) => (
                    <div>
                        <TextArea placeholder='step' value={direction.name} onChange={this.handleDirectionChange(idx)}/>
                        <Button onClick={this.handleRemoveDirection(idx)} size='small'>Remove</Button>
                    </div>
                ))}
                <Button onClick={this.handleAddDirection} size='small'>Add Another Step</Button>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <HiddenField name='ingredients' value={"food"}/>
                <HiddenField name='equipment' value={"things"}/>
                <HiddenField name='directions' value={"steps"}/>
                <HiddenField name='creator' value='fakeuser@foo.com'/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default AddRecipe;
