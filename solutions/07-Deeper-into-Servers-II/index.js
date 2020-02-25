// Deeper into Servers II
//---------------------﻿

// Exercise 2
const { app, get } = require('@eac/webserver')
const accessManager = require('@eac/access-restricted')
const axios = require('axios');

const port = 1337
const limitAccessCount = 5
const apiUrl = 'https://recipes-goodness.herokuapp.com/recipes/%s'

let globalCounter = 0

const checkLimitAccess = ({ res, next }) => {
    globalCounter++;
    const allowAccess = accessManager.checkAccess( globalCounter, limitAccessCount )

    if ( ! allowAccess ) {
        res.json({
            error: "Too many requests",
        });
        return res.end()
    }
    next()
}

app.use('/recipe/:ingredient', checkLimitAccess, async ( req, res ) => {
    const apiCurrent = apiUrl.replace('%s', req.params.ingredient)
    const recipeData = await axios.get( apiCurrent );
    const recipes = recipeData.data.results;
    const response = recipes.length !== 0 ? recipes.splice(0, 3) : { empty: true };

    res.json( response );
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
