import React, { Component } from 'react';
import './RecipeInput.css';

// create a component that holds state for all of the input values for a recipe
class RecipeInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            instructions: '',
            ingredients: [''],
            img: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleNewIngredient = this.handleNewIngredient.bind(this);
        this.handleChangeIng = this.handleChangeIng.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // function for handling the input on changes
    // each input uses this function for it's on change method
    // the name is loaded in and the state is changed based off of which input is being used!
    // one function for all!!!
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // button will add to our ingredients state all of the ingredients plus a space
    // when we run the handle change ingredient button, a new item will be added and this button will re render
    // the new values
    handleNewIngredient(e) {
        const {ingredients} = this.state;
        this.setState({ingredients: [...ingredients, '']})
    }


    // the function needs to figure out which array element is being modified, we can obtain this with
    // the element's name, (name was given an array index in the map method that created these JSX elements)
    handleChangeIng(e) {
        
        // each of the jsx elements are going to have a unique id due to the map method that created them
        // they each have this on change function
        // if the on change function's ID (coming from it's name) is equal to index ...
        const index = Number(e.target.name.split('-')[1]);
        const ingredients = this.state.ingredients.map((ing, i) => {
            // if the current iteration of the map is equal to the selected index,
            // then that iteration's value will be equal to whatever was typed in the input box
            if(i === index) {
                return e.target.value
            }
            return ing;

        });
        // re assign the state with the new values
        this.setState({ingredients})
    }

    // ran when the submit is done on the form
    // prevent default behavior
    // on save is currently a default prop,
    // we can invoke on save and fill it with all the values of state   
    // reset form's state back to default values
    handleSubmit(e) {
        e.preventDefault();
        this.props.onSave({...this.state})
        this.setState({
            title: '',
            instructions: '',
            ingredients: [''],
            img: ''
        })
    }

    render() {
        const {onClose} = this.props;
        // create a variable that destrutures the state values
        const { title, instructions, img, ingredients } = this.state;
        let inputs = ingredients.map((ing, i) => (
            // each of these items coming from our state array will have a unique ID under the name attribute
            <div key={`ingredient${i}`} className="recipe-form-line">
                <label> {i + 1}.
                    <input
                        type="text"
                        name={`ingredient-${i}`}
                        value={ing}
                        size={45}
                        autoComplete="off"
                        placeholder="Ingredient"
                        onChange={this.handleChangeIng}
                    />
                </label>
            </div>
        ));

        return (
            <div className="recipe-form-container">
                <form className='recipe-form' onSubmit={this.handleSubmit}>

                    {/* CLOSE BUTTON */}
                    <button
                        type="button"
                        className="close-button"
                        onClick={onClose}
                    >
                        X
                    </button>

                    {/* TITLE INPUT */}
                    <div className='recipe-form-line'>
                        <label htmlFor='recipe-title-input'>Title</label>
                        <input
                            id='recipe-title-input'
                            key='title'
                            name='title'
                            type='text'
                            value={title}
                            size={42}
                            autoComplete="off"
                            onChange={this.handleChange} />
                    </div>


                    {/* INSTRUCTIONS INPUT */}
                    <label
                        htmlFor='recipe-instructions-input'
                        style={{ marginTop: '5px' }}
                    >Instructions</label>
                        
                    <textarea
                        key='instructions'
                        id='recipe-instructions-input'
                        type='Instructions'
                        name='instructions'
                        rows='8'
                        cols='50'
                        autoComplete='off'
                        value={instructions}
                        onChange={this.handleChange} />


                    {/* list of ingredients loaded via the map method */}
                    {inputs}


                    {/* CREATE NEW INGREDIENT BUTTON */}

                    <button
                        type="button"
                        onClick={this.handleNewIngredient}
                        className="buttons">+
                    </button>
                        
                    {/* IMAGE INPUT DIV */}
                    <div className='recipe-form-line'>
                        <label htmlFor='recipe-img-input'>Image Url</label>
                        <input
                            id='recipe-img-input'
                            type='text'
                            placeholder=''
                            name='img'
                            value={img}
                            size={36}
                            autoComplete='off'
                            onChange={this.handleChange} />
                    </div>


                    {/* SAVE BUTTON */}
                    <button
                        type="submit"
                        className="buttons"
                        style={{ alignSelf: 'flex-end', marginRight: 0 }}
                    >
                        SAVE
                    </button>
                </form>
            </div>
        )
    }

}

export default RecipeInput;