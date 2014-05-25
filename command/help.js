var Kommand = require('./../kommand');
var _       = require('lodash');
var argv    = require('yargs').argv;

/**
 * Utility function to write lines
 *
 * @param string
 */
var writeLn = function(string) {
    console.log(string || '');
}

/**
 * Initialization of the help.
 *
 * @type {Kommand}
 */
var helpCommand = new Kommand('help');
helpCommand.description = "prints useful stuff"

/**
 * Running the help command will display all
 * the available commands in the current console
 * and some other useful informations.
 *
 * @param konzole
 */
helpCommand.run = function(konzole) {
    writeLn();
    console.log("Available commands:");
    writeLn();

    _.each(konzole.commands, function(command){
        var name        = command.name.bold;
        var description = command.description || 'no description provided';

        console.log((" - {name} ({description})".replace('{name}', name).replace('{description}', description)));
    });

    writeLn();

    writeLn(("Run a command with {cmd}".replace('{cmd}', ("'" + (argv['$0']) + " command'").bold)));
};

/**
 * Exports
 *
 * @type {Kommand}
 */
module.exports = helpCommand;