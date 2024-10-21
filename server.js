const http = require('http');
const fs = require('fs');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const hostname = "127.0.0.1";
const port = "3000";

const API_KEY = "AIzaSyDPwVjbCHJt_FjY-zQhk6rowUubtkTrULs";

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({model:"gemini-1.5-flash"});

let characterData = {};

const server = http.createServer(async (req, res) => {

    let filePath = "";

    console.log(req.url);

    if (req.url === '/submit-character') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const parsedData = JSON.parse(body);

            console.log(parsedData);

            // Extract the form data
            const characterName = parsedData.Character_name;
            const characterRace = parsedData.Race;
            const characterClass = parsedData.Class;
            const characterBackstory = parsedData.Backstory;

            characterData = {
                characterName,
                characterRace,
                characterClass,
                characterBackstory
            };

            // Process the extracted data
            console.log('Character Name:', characterName);
            console.log('Character Race:', characterRace);
            console.log('Character Class:', characterClass);
            console.log('Character Backstory:', characterBackstory);

            // Send a response back to the client
            res.writeHead(302, { 'Location': '/game.html' });
            res.end();
        });
    }
    else if (req.url === '/get-character-data') { // Add this endpoint
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(characterData));
    }
    else if(req.url === "/" || req.url === "/home") {
        filePath = __dirname + "/index.html";
    } else if (req.method === 'POST' && req.url === "/query") {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            const prompt = body;

            try {
                const result = await generateContent(prompt);
                if (result === "") {
                    res.statusCode = 408;
                    res.end();
                    return;
                }
                res.statusCode = 200;
                res.setHeader("Content-Type", "text/plain");
                res.end(result);
            } catch (error) {
                console.error('Error generating content:', error);
                res.statusCode = 500;
                res.end('Error generating content');
            }
        });
    } else {
        filePath = __dirname + req.url;
    }

    fs.readFile(filePath, (err, data) => {
        if(err) {
            res.statusCode = 404;
            res.end();
            return;
        }
        res.statusCode = 200;
        if(filePath.search(/.css/)>-1) {
            res.setHeader('Content-Type', 'text/css');
        } else if (filePath.search(/.png/)>-1) {
            res.setHeader('Content-Type', 'image/png');
        } else if (filePath.search(/.html/)>-1){
            res.setHeader('Content-Type', 'text/html');
        } else if (filePath.search(/.js/)>-1){
            res.setHeader('Content-Type', 'text/javascript');
        }
        res.end(data);
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});

async function generateContent(prompt) {
    try {
        const response = await model.generateContent(prompt);
        const generatedText = await response.response.text();
        console.log(generatedText);
        return generatedText;
    } catch (error) {
        console.error('Error in generateContent:', error);
        throw error;
    }
}