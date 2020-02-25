// Deeper into Servers II
//---------------------﻿

// Exercise 2
const { app, get } = require('@eac/webserver')
const accessLimitMiddleware = require('@eac/access-restricted')
const axios = require('axios');

const port = 1337
const limitAccessCount = 5
const apiUrl = 'https://recipes-goodness.herokuapp.com/recipes/%s'

const recipeByIngredientRoutePath = '/recipe/:ingredient';
app.use( recipeByIngredientRoutePath, accessLimitMiddleware(limitAccessCount)).
    get( recipeByIngredientRoutePath, async ( req, res ) => {
    const apiCurrent = apiUrl.replace('%s', req.params.ingredient)
    const { data: recipeData } = await axios.get( apiCurrent );
    const recipes = recipeData.results;
    const response = recipes.length !== 0 ? recipes.splice(0, 3) : { empty: true };

    res.status(response.empty ? 404 : 200);
    res.json( response );
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
