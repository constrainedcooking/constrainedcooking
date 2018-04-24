import React from 'react';
import { Recipes, RecipeSchema } from '/imports/api/recipe/recipe';
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
      image: '',
      description:'',
      time: 0,
      servings: 0,
      tags:[''],
      ingredients: [{name: '', amount: ''}],
      directions: [''],
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

  handleNameChange = (evt) => {
    const newName = evt.target.value;
    this.setState({ name: newName });
  }

  handleTimeChange = (evt) => {
    const newTime = evt.target.value;
    this.setState({ time: newTime });
  }

  handleServingsChange = (evt) => {
    const newServings = evt.target.value;
    this.setState({ servings: newServings });
  }

  handleImageChange = (evt) => {
    const newImage = evt.target.value;
    this.setState({ image: newImage });
  }

  handleDescriptionChange = (evt) => {
    const newDescription = evt.target.value;
    this.setState({ description: newDescription });
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

  /** Beginnning of Direction functions */
  handleDirectionChange = (idx) => (evt) => {
    const newDirections = this.state.directions.map((direction, sidx) => {
      if (idx !== sidx) return direction;
      return evt.target.value;
    });

    this.setState({ directions: newDirections });
  }

  handleAddDirection = () => {
    this.setState({
      directions: this.state.directions.concat([''])
    });
  }

  handleRemoveDirection = (idx) => () => {
    this.setState({
      directions: this.state.directions.filter((d, sidx) => idx !== sidx)
    });
  }

  /** Beginnning of Tags functions */

  handleTagChange = (idx) => (evt) => {
    const newTags = this.state.tags.map((tag, sidx) => {
      if (idx !== sidx) return tag;
      return evt.target.value;
    });

    this.setState({ tags: newTags });
  }

  handleAddTag = () => {
    this.setState({
      tags: this.state.tags.concat([''])
    });
  }

  handleRemoveTag = (idx) => () => {
    this.setState({
      tags: this.state.tags.filter((t, sidx) => idx !== sidx)
    });
  }


  /** On submit, insert the data. */
  submit() {
    const { name, image, description, time, servings, tags, ingredients, directions } = this.state;
    const creator = Meteor.user().username;
    Recipes.insert({ name, image, description, time, servings, tags, ingredients, directions, creator }, this.insertCallback);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Add Recipe</Header>
            <Form ref={(ref) => { this.formRef = ref; }}>
              <Segment>
                <Form.Field className='name' onChange={this.handleNameChange}>
                  <label>Recipe Name</label>
                  <input placeholder='' />
                </Form.Field>
                <Form.Field className='image' onChange={this.handleImageChange}>
                  <label>Image</label>
                  <input placeholder='url location' />
                </Form.Field>
                <Form.Field className='description' onChange={this.handleDescriptionChange}>
                  <label>Description</label>
                  <input placeholder='short recipe description' />
                </Form.Field>
                <Form.Field className='time' onChange={this.handleTimeChange}>
                  <label>Estimated Cooking Time (in minutes)</label>
                  <input placeholder='i.e 20' />
                </Form.Field>
                <Form.Field className='servings' onChange={this.handleServingsChange}>
                  <label>Number of Servings</label>
                  <input placeholder='2' />
                </Form.Field>
                <Header as="h4">Tags</Header>
                {this.state.tags.map((tag, idx) => (
                    <div>
                      <Form.Group className='tags'>
                        <Form.Input placeholder='name' value={tag} onChange={this.handleTagChange(idx)}/>
                        <Button onClick={this.handleRemoveTag(idx)} size='small'>Remove</Button>
                      </Form.Group>
                    </div>
                ))}
                <Button onClick={this.handleAddTag} size='small'>Add Tag</Button>
                <Header as="h4">Ingredients</Header>
                {this.state.ingredients.map((ingredient, idx) => (
                <div>
                  <Form.Group className='ingredients'>
                    <Form.Input placeholder='name' value={ingredient.name} onChange={this.handleIngredientNameChange(idx)}/>
                    <Form.Input placeholder='ie. 2 tsp' value={ingredient.amount} onChange={this.handleIngredientAmountChange(idx)}/>
                    <Button onClick={this.handleRemoveIngredient(idx)} size='small'>Remove</Button>
                  </Form.Group>
                </div>
                ))}
                <Button onClick={this.handleAddIngredient} size='small'>Add Ingredient</Button>
                <Header as="h4">Directions</Header>
                {this.state.directions.map((direction, idx) => (
                    <div>
                        <TextArea placeholder='step' value={direction.name} onChange={this.handleDirectionChange(idx)} className='directions'/>
                        <Button onClick={this.handleRemoveDirection(idx)} size='small'>Remove</Button>
                    </div>
                ))}
                <Button onClick={this.handleAddDirection} size='small'>Add Another Step</Button>
                <Button onClick={this.submit} value='Submit'>Submit</Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
    );
  }
}

export default AddRecipe;
