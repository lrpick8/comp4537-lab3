/**
 * Main server application file which sets up an HTTP server to handle requests
 * for getting the current date, writing to a file, and reading from a file.
 * 
 * Responsible for coordinating between the DateGetter, EnglishMessages, and FileManager
 * 
 * @author Liam Pickrell
 * @author Chat GPT (for proper routing, server setup and initialization)
 */

const http = require('http');
const url = require('url');

const DateGetter = require("./modules/dategetter");
const EnglishMessages = require("./lang/en/user");
const FileManager = require("./modules/filemanager");

class ServerApp {

    /**
     * Constructor that creates the server application onto port 3000
     * and creates a new FileManager Object with every server creation.
     * 
     * @param {number} port the port number for the server
     */
    constructor(port = 3000) {
        this.port = port;
        this.fileManager = new FileManager();
    }

    /**
     * Method to start the server and listen on the specified port (should be 3000 every time).
     */
    start() {
        const server = http.createServer(this.handleRequest.bind(this));
        server.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });

    }

    /**
     * The method used by http.createServer() to route all incoming requests.
     * Parses the URL and decides how to handle the request based on the pathname.
     * 
     * @param {IncomingMessage} req the request the server receives
     * @param {OutgoingServerResponse} res the response from the server
     * @returns 
     */
    handleRequest(req, res) {
        const parsedUrl = url.parse(req.url, true);
        const pathname = parsedUrl.pathname;

        if (pathname.includes("/getDate")) {
            const name = parsedUrl.query.name || "Nameless Mysteriousness";
            const date = DateGetter.getCurrentDateTime();
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

// Create the server application and start it on port 3000
new ServerApp(3000).start();