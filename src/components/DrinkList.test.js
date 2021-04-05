import React from 'react';
import { render } from '@testing-library/react';
import DrinkList from './DrinkList';


//idDrink, strDrinkThumb, strDrink, strGlass

test("renders the correct content", () => {
    const testData = [{idDrink: "13501", strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/tqpvqp1472668328.jpg", strDrink: "ABC", strGlass: "Wine" }];
    const { getByText } = render(<DrinkList cocktailResults={testData} />)

    getByText("Details");
    getByText("ABC");

});

test("correctly displays no resutls found", () => {
    const testData = null;
    const { getByText } = render(<DrinkList cocktailResults={testData} />)

    getByText("No results found");
});

