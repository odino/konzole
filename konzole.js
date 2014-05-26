/**
 * Dependencies
 */
var colors      = require('colors');
var argv        = require('yargs').argv;
var help        = require('./command/help');
var Kommand     = require('./kommand');
var Input       = require('./input');

/**
 * Constructor of the konzole object.
 * @param name
 * @param version
 * @constructor
 */
function Konzole(name, version){
    this.name       = name || 'konzole';
    this.version    = version || "1.0.0";
    this.commands   = {};
};

/**
 * Runs the console.
 */
Konzole.prototype.run = function(){
    console.log('{name} {version}'.replace('{name}', this.name).replace('{version}', this.version).green)

    var commandName = argv._[0] || 'help';

    console.log('Executing "{commandName}" command'.replace('{commandName}', commandName).green);

    var command = this.commands[commandName];

    if (!command) {
        console.log('Command "{commandName}" does not exist. Did you forget to register it?'.replace('{commandName}', commandName).red);
        this.commands['help'].run(this);
        return;
    }

    command.run(this, new Input(command));

    console.log("\nGame over".rainbow)
};

/**
 * Adds a command to the current console.
 *
 * @param name
 * @param command
 * @returns {boolean}
 */
Konzole.prototype.addCommand = function(name, command) {
    if (command instanceof Kommand) {
        this.commands[name] = command;

        return true;
    }

    throw new Error("Attempting to register an invalid command '{name}'. The command must inherit from the Kommand class (it doesn't)".replace('{name}', name))
};

/**
 * Exported method that will boot a brand new
 * Konzole object with some native commands.
 *
 * @param name
 * @param version
 * @returns {Konzole}
 */
var createKonzole = function(name, version) {
    var konzole = new Konzole(name, version);

    konzole.addCommand('help', help);

    return konzole;
}

/**
 * Exports
 *
 * @type {createKonzole}
 */
module.exports = createKonzole;