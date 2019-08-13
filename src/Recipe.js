import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Recipe.css';

class Recipe extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    instructions: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
  }
  
  render() {
    const {title, img, instructions, onDelete, id} = this.props;
    const ingredients = this.props.ingredients.map((ing, index) => (
      <li key={index}>{ing}</li> 
    ));
    return (
      <div className="recipe-card">
        <div className="recipe-card-img">
          <img src={img} alt={title} />
        </div>
        <div className="recipe-card-content">
          <h3 className="recipe-title">{title}</h3>
          <h4>Ingredients:</h4>
          <ul>
            {ingredients}
          </ul>
          <h4>Instructions:</h4>
          <p>{instructions}</p>
        </div>

        {/* delete button needs to take an onDelete function as a prop, so we will add that to the list of props to destructure */}
        {/* we will pass an onDelete method down from the main component into the recipe component as a prop */}
        <button type="button" onClick={()=> onDelete(id)}>Delete</button>
      </div>
    );
  }
}

export default Recipe;