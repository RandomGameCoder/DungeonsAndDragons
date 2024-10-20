const http = require('http');
const fs = require('fs');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const hostname = "127.0.0.1";
const port = "3000";

const API_KEY = "AIzaSyDPwVjbCHJt_FjY-zQhk6rowUubtkTrULs";

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({model:"gemini-1.5-flash"});

var result = "";
var generated = false;

const timer = 50000;

const server = http.createServer(async (req, res) => {

    let filePath = "";

    console.log(req.url);

    if(req.url === "/" || req.url === "/home") {
        filePath = __dirname + "/index.html";
    } else if (req.url.search(/query/)>-1) {
        const prompt = req.url.replace(/\/query\//,"");
        try {
            const result = await generateContent(prompt);
            if(result === "") {
                res.statusCode = 408;
                res.end();
                return;
            }
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/plain");
            res.end(result);
        } catch (error) {
            res.statusCode = 500;
            res.end("Error generating content");
        }
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
    const response = await model.generateContent(prompt);
    return response.response.text();
}