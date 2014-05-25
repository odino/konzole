/**
 * The Kommand class is a base class for
 * commands that can run through a console.
 *
 * @param name
 * @param options
 * @constructor
 */
function Kommand(name, options){
    if (!name) {
        throw new Error('commands must have a name')
    }

    this.name    = name;
    this.options = options || {};
};

/**
 * Function to be overridden with the command's
 * real code.
 *
 * @param konzole
 */
Kommand.prototype.run = function(konzole) {
    throw new Error("You must implement the #run() method in your commands");
};

/**
 * Exporting the Kommand "class"
 *
 * @type {Kommand}
 */
module.exports = Kommand;