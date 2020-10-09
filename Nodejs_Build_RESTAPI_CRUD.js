//Build REST APIs using nodejs Express

const express = require('express'); //express framework
const Joi = require('joi'); //data validation for js. Returns a Class from this module
const app = express(); //create express app
app.use(express.json()); //adding middleware to handle json objects
require('dotenv').config(); //to load environment variables from .env

//dishes array
const dishes = [
    {id: 1, name: 'Chicken 65'},
    {id: 2, name: 'Gobi Manchurian'},
    {id: 3, name: 'Paneer Tikka'},
    {id: 4, name: 'Vegetable Pakoras'},
    {id: 5, name: 'Samosa'},
    {id: 6, name: 'Aloo Tikki'},
    {id: 7, name: 'Jalapeno Poppers'}
]

//create GET endpoint
//takes path and callback function
app.get('/', (req,res) => {
    res.send('Dishes Menu');
});

//GET all dishes
app.get('/api/dishes',(req,res) => {
    res.send(dishes);
});
//
// GET a specific dish  /api/dishes/:id
// :id - id is a required parameter
///api/dishes/1?sortBy=place -  sortBy=place is a query parameter that is optional
app.get('/api/dishes/:id', (req, res) => {
    //.find is an array method and it accepts a function
    const dish = dishes.find(c => c.id === parseInt(req.params.id));
    //if there is no dish then return from this function immediately without proceeding further
    if (!dish) return res.status(404).send('The dish with the given ID was not found');
    res.send(dish);
})

//POST dishes - get the length of the menu and submit/add a new dish
app.post('/api/dishes', (req, res) => {
    const { error } = validateDish(req.body); //result.error "object destructure"
    //if there is an error, return immediately
    if (error) return res.status(400).send(error.details[0].message);
        
    const dish = {
        id: dishes.length + 1, //manually assign id. If it is db, id will be assigned by db
        name: req.body.name     //need to read name from the body of the request
    };
    dishes.push(dish);
    res.send(dish);
});

// PUT endpoint - update a specific dish/record
app.put('/api/dishes/:id', (req, res) => {

    //look up the dish    
    const dish = dishes.find(c => c.id === parseInt(req.params.id));

    // if there is no dish, then return immediately without proceeding to validation
    if (!dish) return res.status(404).send('The dish with the given ID was not found');

    const { error } = validateDish(req.body); //result.error
    if (error) return res.status(400).send(error.details[0].message);
        
    //update dish
    dish.name = req.body.name;
    res.send(dish);
})

//DELTE a dish/endpoint
app.delete('/api/dishes/:id', (req,res) => {

    //look up the dish    
    const dish = dishes.find(c => c.id === parseInt(req.params.id));
    //if does not exist, return 404
    if (!dish) return res.status(404).send('The dish with the given ID was not found');

    //delete
    const index = dishes.indexOf(dish);
    dishes.splice(index,1);
    res.send(dish);
    //return the same dish
})
//this logic is used by POST and PUT, so write a new function for the common logic
function validateDish(dish) {
    //If invalid, return   
    const schema = Joi.object({
        name: Joi.string().min(6).required() //name should a string with min 6 chars
      });
    return schema.validate(dish)     
}
//PORT
const port = process.env.PORT || 4000;
app.listen(port,() => console.log(`Listening on port ${port}`));