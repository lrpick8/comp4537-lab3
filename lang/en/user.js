/**
 * Creates all the potential user facing strings in English.
 * Contains a greeting function that takes a name and date and returns
 * a greeting message which is the concatenation of those two parameters as
 * described in the lab instructions.
 *
 * @author Liam Pickrell
 */

class EnglishMessages {
    static greeting(name, date) {
        return `Hello ${name}, What a beautiful day. Server current date and time
        is: ${date}`;
    }
}

module.exports = EnglishMessages;