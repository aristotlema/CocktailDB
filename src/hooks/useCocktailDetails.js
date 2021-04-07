import { useState } from 'react';
import cocktailDB from '../api/cocktailDB';

const useCocktailDetails = () => {
    const [selectedCocktail, setSelectedCocktail] = useState({});
    const [loading, setLoading] = useState(false);

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

    return [selectedCocktail, loading, details]
};

export default useCocktailDetails;