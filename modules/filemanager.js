const fs = require("fs");
const path = require("path");

class FileManager {

    constructor() {
        this.dataDir = path.join(__dirname, "..", "data");
        this.filePath = path.join(this.dataDir, "file.txt");

        if(!fs.existsSync(this.dataDir)) {
            fs.mkdirSync(this.dataDir);
        }
    }

    appendToFile(text) {
        fs.appendFileSync(this.filePath, text + "\n");
    }

    readFromFile() {
        if (!fs.existsSync(this.filePath)) {
            return null;
       }
       return fs.readFileSync(this.filePath, "utf-8");
    }
}

module.exports = FileManager;