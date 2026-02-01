const http = require('http');
const url = require('url');

const Utils = require("./modules/utils");
const EnglishMessages = require("./lang/en/user");
const FileManager = require("./modules/filemanager");

class ServerApp {
    constructor(port = 3000) {
        this.port = port;
        this.fileManager = new FileManager();
    }

    start() {
        const server = http.createServer(this.handleRequest.bind(this));
        server.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });

    }

    handleRequest(req, res) {
        const parsedUrl = url.parse(req.url, true);
        const pathname = parsedUrl.pathname;

        if (pathname.includes("/getDate")) {
            const name = parsedUrl.query.name || "Nameless Mysteriousness";
            const date = Utils.getCurrentDateTime();
            const message = EnglishMessages.greeting(name, date);

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`<h1 style="color: blue;">${message}</h1>`);
            return;
        }

        if (pathname.includes("/writeFile")) {
            const text = parsedUrl.query.text;

            if (!text) {
                res.writeHead(200);
                res.end("Please provide text to write using ?text=your_text");

                return;
            }

            this.fileManager.appendToFile(text);
            res.writeHead(200);
            res.end("Text written to file successfully.");
            return;
        }

        if (pathname.includes("/readFile")) {
            const content = this.fileManager.readFromFile();

            if(!content) {
                res.writeHead(404);
                res.end("file.txt doesn't exist.");
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(content);
            return;
        }

        res.writeHead(404);
        res.end("Endpoint not found.");
    }
}

new ServerApp(3000).start();