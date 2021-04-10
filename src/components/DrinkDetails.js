import React, { useEffect } from 'react';
import Link from './Link';
import Button from './Button';
import Spinner from './Spinner';
import './DrinkDetails.scss';
import useCocktailDetails from '../hooks/useCocktailDetails';

const DrinkDetails = ({ cocktailID }) => {
    const [selectedCocktail, loading, details] = useCocktailDetails();

    useEffect(() => {
        details(cocktailID);
        // Details not in dependancy array, need to find better solution
        // This is how the data is being fetched for the cocktail. If it is in dependecy array will constantly refetch
        // eslint-disable-next-line
    }, [cocktailID]);

    const renderIngredients = () => {
        let rows = []
        for(let i = 1; i <= 15; i++){
            const currentMeasure = selectedCocktail[`strMeasure${i}`];
            const currentIngredient = selectedCocktail[`strIngredient${i}`];
            // Needed this refactor because some have empty strings as ingredients 
            // examine JSON for idDRink 178343 - Michelada for example of this
            const isNull = currentIngredient === null && currentMeasure === null;
            const isEmptyString = currentIngredient === "" && currentMeasure === "";
            // no measurement refactor ID 15691 Zoksel
            const noMeasurement = currentMeasure === null || currentMeasure === "";

            if(isNull || isEmptyString) {
                break;
            } else if(noMeasurement) {
                rows.push(<div key={i}>{currentIngredient}</div>);
            } else {
                rows.push(<div key={i}>{currentMeasure} - {currentIngredient}</div>);
            }
        }
        return <div>{rows}</div>;
    };

    const renderPage = () => {
        if(loading) {
            return <Spinner />;
        } else if(selectedCocktail) {
            return(
                <section className="drink-details">
                    <Link href="/">
                        <Button buttonTitle="Return Home"></Button>
                    </Link>
                    <h1 className="drink-details-title">{selectedCocktail.strDrink}</h1>
                    <div className="drink-details-main">
                        <div className="drink-details-image">
                            <img src={selectedCocktail.strDrinkThumb} alt={selectedCocktail.strDrink} />
                        </div>
                        <div className="drink-details-body">
                            <div><label htmlFor="Name" className="high-light">Name: </label> {selectedCocktail.strDrink}</div>
                            <div><label htmlFor="Category" className="high-light">Category: </label> {selectedCocktail.strCategory}</div>
                            <div><label htmlFor="Info" className="high-light">Info: </label> {selectedCocktail.strAlcoholic}</div>
                            <div><label htmlFor="Glass" className="high-light">Glass: </label> {selectedCocktail.strGlass}</div>
                            <div><label htmlFor="Instructions" className="high-light">Instructions: </label> {selectedCocktail.strInstructions}</div>
                            
                            <h2 className="ingredients"><label htmlFor="ingredients" className="high-light">Ingredients </label></h2>
                            <div>
                                {renderIngredients()}
                            </div>
                        </div>
                    </div>
                </section>
            );
        }
    };
    return (
        <>
            {renderPage()}
        </>
    );
};  

export default DrinkDetails;