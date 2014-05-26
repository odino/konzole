/**
 * The option class represents a command
 * option.
 *
 * @param name
 * @param options
 * @constructor
 */
function Option(name, alias, defaultValue){
    if (!name) {
        throw new Error('options must have a name')
    }

    this.name           = name;
    this.alias          = alias || name;
    this.defaultValue   = defaultValue || false;
};

/**
 * Exporting the Option "class"
 *
 * @type {Kommand}
 */
module.exports = Option;