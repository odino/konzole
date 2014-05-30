# Konzole

Console applications in NodeJS made easy as hell.

![Konzole](https://raw.githubusercontent.com/odino/konzole/master/bin/console.png?token=328420__eyJzY29wZSI6IlJhd0Jsb2I6b2Rpbm8va29uem9sZS9tYXN0ZXIvYmluL2NvbnNvbGUucG5nIiwiZXhwaXJlcyI6MTQwMTY0NzQ1MX0%3D--e83af2a7b2deeed6b9c9bbf5eb9bdc3482d050e0)

## Usage

Require a `konzole` within a simple node script and run it:

``` javascript
var konzole = require('./konzole')('MY FIRST CONSOLE', "1.0.0");

konzole.run();
```

you will see an help script describing the commands that are registered
within this console (only `help`, for now).

Let's declare a new `ls` command that will simply `console.log` the
contents of a directory:

``` javascript
var konzole = require('./konzole')('MY FIRST CONSOLE', "1.0.0");
var kommand = require('./kommand');
var fs = require('fs');

var ls = new kommand('Lists contents of a directory');

ls.run = function(konzole) {
    console.log(fs.readdirSync('.'))
};

konzole.addCommand('ls', ls);

konzole.run();
```

et-voila:

![ls command](https://raw.githubusercontent.com/odino/konzole/master/bin/ls.png?token=328420__eyJzY29wZSI6IlJhd0Jsb2I6b2Rpbm8va29uem9sZS9tYXN0ZXIvYmluL2xzLnBuZyIsImV4cGlyZXMiOjE0MDE2ODgzNjZ9--1b7959250c37da96514d12e801f14a95b313c4ff)

## Options

To add options to your command, simply declare them as dependencies
of your command:

``` javascript
var kommand = require('./option');

var ls = new kommand('Lists contents of a directory', [new option('d', 'dir', '.')]);

ls.run = function(konzole, input) {
    console.log(fs.readdirSync(input.getOption('d')))
};
```

the three arguments of an option are:

* its name (`-d`)
* its alias (`--dir`)
* its default value (`.`)

Now you can simply use your pimped command with `node index.js ls --dir=/home/you/something`.

## Example console

In this example we are adding to the console
the already-seen `ls` command and a new, `quote`,
command that will retrieve a random quote from the
internet.

Just like that.

``` javascript
var konzole = require('./konzole')('MY FIRST CONSOLE', "1.0.0");
var kommand = require('./kommand');
var option  = require('./option');
var fs = require('fs');
var colors = require('colors');
var _ = require('lodash');
var HTTP = require("q-io/http");

var ls = new kommand('Lists contents of a directory', [new option('d', 'dir', '.')]);
ls.run = function(konzole, input) {
    var directory = input.getOption('dir');

    console.log(fs.readdirSync(directory));
};

var quote = new kommand('Retrieves a random quote');
quote.run = function(konzole, input) {
    HTTP.request({url: "http://www.iheartquotes.com/api/v1/random.json", method: 'GET'}).then(function(response){
        response.body.read().then(function (buffer) {
            console.log(JSON.parse(buffer.toString('UTF-8')).quote.inverse);
        });
    })
};

konzole.addCommand('ls', ls);
konzole.addCommand('quote', quote);

konzole.run();
```

![Konzole](https://raw.githubusercontent.com/odino/konzole/master/bin/quote.png?token=328420__eyJzY29wZSI6IlJhd0Jsb2I6b2Rpbm8va29uem9sZS9tYXN0ZXIvYmluL3F1b3RlLnBuZyIsImV4cGlyZXMiOjE0MDIwNzU0MTR9--c173a76cafbe5536a915aad1b63ad397b8e75140)

Have fun!
