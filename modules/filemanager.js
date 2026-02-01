/**
 * Class describing all file operations for the server to use.
 * These include appending text to a file and reading text from a file.
 * The constructor ensures the data is always read/written to/from /data/file.txt.
 * 
 * @author Liam Pickrell
 * @author Chat GPT (for proper directory creation and routing issues)
 */

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