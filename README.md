# Konzole

Console applications in NodeJS made easy as hell.

With rainbows.

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

var ls = new kommand('ls');

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

var ls = new kommand('ls', [new Option('d', 'dir', '.')]);

ls.run = function(konzole, input) {
    console.log(fs.readdirSync(input.getOption('d')))
};
```

the three arguments of an option are:

* it's name (`-d`)
* it's alias (`--dir`)
* it's default value (`.`)

Now you can simply use your pimped command with `node index.js ls --dir=/home/you/something`.
