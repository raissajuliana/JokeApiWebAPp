const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', { name: '', joke: null });
});

app.post('/joke', async (req, res) => {
    const userName = req.body.name || 'Friend'; 

    try {
        
        const response = await axios.get('https://v2.jokeapi.dev/joke/Programming?type=single');
        
        let joke = response.data.joke;
        if (joke) {
            
            joke = joke.replace(/(?:You|Your)/g, userName);
            res.render('index', { joke: joke, name: userName });
        } else {
            res.render('index', { joke: "Sorry, no joke available at the moment.", name: userName });
        }
    } catch (error) {
        console.error(error);
        res.render('index', { joke: "Error fetching joke, please try again later.", name: userName });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});