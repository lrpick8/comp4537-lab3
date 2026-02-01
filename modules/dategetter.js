/**
 * Class describing a utility function which returns the current date 
 * and time and formats it to a usable string for the server to use.
 * 
 * @author Liam Pickrell
 */

class DateGetter {
    static getCurrentDateTime() {
        return new Date().toString();
    }
}

module.exports = DateGetter;