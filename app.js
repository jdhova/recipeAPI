

const express = require("express")
const app = express()
const axios = require("axios")
const bodyParser = require('body-parser')

const app_id = "92a80426"
const app_key = "e1f8ff8e7d4d231e48e284f4424cc865"



// Middleware
app.use(bodyParser.urlencoded({extended:false}));

var hbs = require("hbs");
hbs.registerPartials(__dirname + '/views/partials');

app.set('views', __dirname + '/views');   // handle bars
app.set('view engine', 'hbs');




app.get("/searchRecipe", function(req, res) {
   res.render("searchRecipe")
    
 })


app.post("/searchRecipe", function(req,res){
    //var searchTerm = "recipes"
    axios.get(`https://api.edamam.com/search`, {
        params: {
            q: req.body.searchrecipe,
            app_id: "92a80426",
            app_key: "e1f8ff8e7d4d231e48e284f4424cc865"
        }
    })
    .then((result)=> {

       // debugger
        console.log(result.data.hits[0])
        res.render("reciperesult", {search : result.data.hits})
    })
    .catch((err)=> {
        
        res.send("ERROR")
    })

})


app.listen(3000, () => {
    console.log("hello working")
});