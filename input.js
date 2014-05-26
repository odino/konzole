var _       = require('lodash');
var argv    = require('yargs').argv;

/**
 * The option class represents a command
 * option.
 *
 * @param name
 * @param options
 * @constructor
 */
function Input(command){
    this.command = command;
};

/**
 * Returns the value of an option.
 *
 * @param nameOrAlias
 * @returns {*|string|Option.defaultValue}
 */
Input.prototype.getOption = function(nameOrAlias) {
    var option = _.find(this.command.options, {name: nameOrAlias}) || _.find(this.command.options, {alias: nameOrAlias});

    if (!option) {
        throw new Error("Option '{opt}' does not exist".replace('{opt}', nameOrAlias).red);
    }

    return argv[option.name] || argv[option.alias] || option.defaultValue;
}

/**
 * Exporting the Option "class"
 *
 * @type {Kommand}
 */
module.exports = Input;