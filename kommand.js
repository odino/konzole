var _ = require('lodash');

/**
 * The Kommand class is a base class for
 * commands that can run through a console.
 *
 * @param name
 * @param options
 * @constructor
 */
function Kommand(description, options){
    this.description    = description || 'No description provided';
    this.options        = options || [];
};

/**
 * Function to be overridden with the command's
 * real code.
 *
 * @param konzole
 */
Kommand.prototype.run = function() {
    throw new Error("You must implement the #run() method in your commands");
};

/**
 * Exporting the Kommand "class"
 *
 * @type {Kommand}
 */
module.exports = Kommand;