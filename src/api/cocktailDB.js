import axios from 'axios';
//https://www.thecocktaildb.com/api/json/v1/1/search.php?s=mar
export default axios.create({
    baseURL: 'https://www.thecocktaildb.com/api/json/v1/1'
});