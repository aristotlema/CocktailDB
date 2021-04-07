import { useState, useEffect } from 'react';
import cocktailDB from '../api/cocktailDB';

const useCocktailSearch = ( defaultSearchTerm ) => {
    const [cocktailResults, setCocktailResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        search(defaultSearchTerm);
    }, [defaultSearchTerm]);

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
    return [cocktailResults, loading, search];
};

export default useCocktailSearch;