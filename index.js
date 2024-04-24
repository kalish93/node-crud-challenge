const express = require('express')
const app = express()
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

let persons = [{
    id: '1',
    name: 'Sam',
    age: '26',
    hobbies: []    
}] //This is your in memory database

app.set('db', persons)
app.use(express.json())
app.use(cors())

//Get all persons
app.get('/person', (req, res)=>{
    res.status(200).json(persons);
})

//Create a person
app.post('/person', (req, res)=>{
    const newPerson = req.body;
    newPerson.id = uuidv4();
    persons.push(newPerson);
    res.status(201).json(newPerson); 
})

//Get a single person
app.get('/person/:personId', (req, res) =>{
    const id = req.params.personId;
    const person = persons.find((p) => p.id === id);
    if(person){
    res.status(200).json(person);
    }else{
        res.status(404).json({'message': 'Person not found.'})
    }
})

//Update a person
app.put('/person/:personId', (req, res) =>{
    const id = req.params.personId;
    const updatedPerson = req.body;
    const index = persons.findIndex((p) => p.id === id);
    if(index !== -1){
        persons[index] = {...persons[index], ...updatedPerson}
        res.status(200).json(persons[index]);
    }else{
        res.status(404).json({'message': 'Person not found.'})
    }
})

//Update a person
app.delete('/person/:personId', (req, res) =>{
    const id = req.params.personId;
    persons = persons.filter((p) => p.id !== id);
    res.status(204).send("Person deleted successfully.'")
    
})

app.use((req, res, next) => {
    res.status(404).send('404 Not Found');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

if (require.main === module) {
    app.listen(3000)
}
module.exports = app;