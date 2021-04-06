import React, { useState, useEffect } from 'react';
import './reset.css';
import './App.scss';
import Route from './Route';
import cocktailDB from '../api/cocktailDB';
import NavBar from './NavBar';
import SearchBar from './SearchBar';
import DrinkList from './DrinkList';
import DrinkDetails from './DrinkDetails';



const App = () => {
    const [cocktailResults, setCocktailResults] = useState([]);
    const [selectedCocktail, setSelectedCocktail] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        search('c');
    }, []);

    const search = async (term) => {
        setLoading(true);
        const { data } = await cocktailDB.get('/search.php', {
            params: {
                s: term
            }
        });
        setCocktailResults(data.drinks);
        setLoading(false);
    };
    const details = async (id) => {
        setLoading(true);
        const { data } = await cocktailDB.get('/lookup.php', {
            params: {
                i: id
            }
        });
        setSelectedCocktail(data.drinks[0]);
        setLoading(false);
    };

    return (
        <div>
            <NavBar />
            <main className="main-content">
                <Route path="/">
                    <SearchBar onFormSubmit={search}/>
                    <DrinkList loading={loading} details={details} cocktailResults={cocktailResults} />
                </Route>
                <Route path="/about">
                    <h1>About page</h1>
                </Route>
                <Route path={`/details/${selectedCocktail.idDrink}`}>
                    <DrinkDetails loading={loading} selectedCocktail={selectedCocktail} />
                </Route>
            </main>    
        </div>
    );
};

export default App;