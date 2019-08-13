import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar';
import RecipeList from './RecipeList';
import './App.css';
import RecipeInput from './RecipeInput';

class RecipeApp extends Component {

  constructor(props) {
    super(props);
    // since this array will later be modified, using the index value as a key will not be sufficient
    // we will instead pass some ID's to these elements
    // we add another piece of state called nextRecipeId that will be used to track the next id
    // change the map method that maps through these elements to use ID instead of the array index

    this.state = {
      recipes: [
        {
          id: 0,
          title: "Spaghetti",
          instructions: "Open jar of Spaghetti sauce.  Bring to simmer.  Boil water.  Cook pasta until done.  Combine pasta and sauce",
          ingredients: ["pasta", "8 cups water", "1 box spaghetti"],
          img: "spaghetti.jpg"
        },
        {
          id: 1, 
          title: "Milkshake",
          instructions: "Combine ice cream and milk.  Blend until creamy",
          ingredients: ["2 Scoops Ice cream", "8 ounces milk"],
          img: "milkshake.jpg"
        }, 
        { 
          id: 2,
          title: "Avocado Toast",
          instructions: "Toast bread.  Slice avocado and spread on bread.  Add salt, oil, and pepper to taste.",
          ingredients: ["2 slices of bread", "1 avocado", "1 tablespoon olive oil", "1 pinch of salt", "pepper"],
          img: "avocado_toast.jpg"
        }
      ], 
      nextRecipeId: 3,
      // state that determines wether or not the form is displayed, held in the app component because two
      // siblings are both in need of the state
      showForm: false
    }
    this.handleSave = this.handleSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  handleSave(recipe){
    this.setState((prevState, props) => {
      const newRecipe = {...recipe, id: this.state.nextRecipeId};
      return {
        nextRecipeId:  prevState.nextRecipeId + 1,
        recipes: [...this.state.recipes, newRecipe],
        showForm: false
      }
    })
  }

  // this creates a new array with all elements that dont match the passed in id of the clicked button
  onDelete(id) {
    const recipes = this.state.recipes.filter(element => element.id !== id);
    this.setState({recipes})
  }

  render() {
    const {showForm} = this.state;
    return (
      <div className="App">
        {/* we must give the navbar a call back to change the state of show form */}
        {/* then we must go into the navbar component and tell navbar how to handle this prop */}
        <Navbar onNewRecipe={() => this.setState({showForm: true})}/>  
        {/* ternary operator, if true show form, else show nothing */}
        { showForm ? 
        <RecipeInput myLabel={"something"} 
        onSave={this.handleSave}
        onClose={() => this.setState({showForm: false})}/> : null }
        <RecipeList onDelete={this.onDelete} recipes={this.state.recipes} />
     
      </div>
    );
  }
}

export default RecipeApp;