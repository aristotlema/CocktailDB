import React from 'react';
import Link from './Link';
import Button from './Button';
import './DrinkDetails.scss';

const DrinkDetails = ({ selectedCocktail }) => {
    console.log(selectedCocktail);
    
    const renderIngredients = () => {
        let rows = []
        for(let i = 1; i <= 15; i++){
            let currentMeasure = selectedCocktail[`strMeasure${i}`];
            let currentIngredient = selectedCocktail[`strIngredient${i}`];
            // Needed this refactor because some have empty strings as ingredients 
            // examine JSON for idDRink 178343 - Michelada for example of thisd
            let isNull = currentIngredient === null && currentMeasure === null;
            let isEmptyString = currentIngredient === "" && currentMeasure === "";
            // no measurement refactor ID 15691 Zoksel
            let noMeasurement = currentMeasure === null || currentMeasure === "";

            if(isNull || isEmptyString) {
                break;
            }
            else if(noMeasurement) {
                rows.push(<div key={i}>{currentIngredient}</div>);
            } 
            else {
                rows.push(<div key={i}>{currentMeasure} - {currentIngredient}</div>);
            }
        }
        return <div>{rows}</div>;
    };
    return (
        <section className="drink-details">
            <Link href="/">
                <Button buttonTitle="Return Home"></Button>
            </Link>
            <h1 className="drink-details-title">{selectedCocktail.strDrink}</h1>
            <div className="drink-details-image">
                <img src={selectedCocktail.strDrinkThumb} alt={selectedCocktail.strDrink} />
            </div>
            <div className="drink-details-body">
                <div><label for="Name" className="high-light">Name: </label> {selectedCocktail.strDrink}</div>
                <div><label for="Category" className="high-light">Category: </label> {selectedCocktail.strCategory}</div>
                <div><label for="Info" className="high-light">Info: </label> {selectedCocktail.strAlcoholic}</div>
                <div><label for="Glass" className="high-light">Glass: </label> {selectedCocktail.strGlass}</div>
                <div><label for="Instructions" className="high-light">Instructions: </label> {selectedCocktail.strInstructions}</div>
                

                <h2 className="ingredients"><label for="ingredients" className="high-light">Ingredients </label></h2>
                <div>
                    {renderIngredients()}
                </div>
            </div>
        </section>
        
    );
};  

export default DrinkDetails;