// defining api key for meaningful cloud api website

const myApiKey = '609ce07ec393364d3f2b9b761c26360d';

const firstPartURL = 'https://api.meaningcloud.com/sentiment-2.1';

// definied a port variable

const port = 8082;

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

const app = express()

app.use(express.static('dist'))

// require cors package
const cors = require('cors')
//use cors
app.use(cors());

// require body-parser
const bodyParser = require('body-parser')

// use body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(port, function () {
    console.log(`Example app listening on port:${port}!`)
})

// creating the post function/request

app.post('/checkingURL', async (req, res) => {
    // pulled the URL and fetched the full URL link
    const backend_URL = req.body.url
    const response = await fetch(`${firstPartURL}?key=${myApiKey}&url=${backend_URL}$lang=en`);

    // try posting the pulled data into the json object
    try {
        // pulled the data required and stored them in variables
        const pulled_data = await response.json();
        const backend_Text = pulled_data.sentence_list[0].text;
        const backend_Score_tag = pulled_data.score_tag;
        const backend_Agreement = pulled_data.agreement;
        const backend_Subjectivity = pulled_data.subjectivity;
        const backend_Confidence = pulled_data.confidence;
        const backend_irony = pulled_data.irony;

        // fill the pulled data
        const backend_fullData = {
            text: backend_Text,
            score_tag: backend_Score_tag,
            agreement: backend_Agreement,
            subjectivity: backend_Subjectivity,
            confidence: backend_Confidence,
            irony: backend_irony
        }
        res.json(backend_fullData);
        console.log(backend_fullData);

    // catch error if any and log out the error with a message    
    } catch (error) {
        console.log('There is an error', error);
    }
})

// just a test function provided with the starter code
app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})