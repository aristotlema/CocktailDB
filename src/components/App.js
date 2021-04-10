import React, { useState, useEffect } from 'react';
import './reset.css';
import './App.scss';
import Route from './Route';
import NavBar from './NavBar';
import SearchBar from './SearchBar';
import DrinkList from './DrinkList';
import DrinkDetails from './DrinkDetails';
import useCocktailSearch from '../hooks/useCocktailSearch';



const App = () => {
    const [cocktailID, setCocktailID] = useState(null); 
    const [cocktailResults, loading, search] = useCocktailSearch('c');

    useEffect(() => {
        // If page is refreshed on details page, will set the ID drink allowing data to persist
        const currentPage = window.location.pathname;
        if (currentPage.slice(0, 9) === "/details/"){
            setCocktailID(currentPage.slice(9));
        }
    }, []);


    const passDrinkID = (id) => {
        setCocktailID(id);
    };

    return (
        <div>
            <NavBar />
            <main className="main-content">
                <Route path="/">
                    <SearchBar onFormSubmit={search}/>
                    <DrinkList loading={loading} passDrinkID={passDrinkID} cocktailResults={cocktailResults} />
                </Route>
                <Route path="/about">
                    <h1>About page</h1>
                </Route>
                <Route path={`/details/${cocktailID}`}>
                    <DrinkDetails cocktailID={cocktailID} />
                </Route>
            </main>    
        </div>
    );
};

export default App;