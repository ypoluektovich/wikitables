# Wikitables

Have you ever looked at a big Wikipedia article of the "Comparison of ..." variety, seen its many huge tables, and despaired? Well, now your despair is about to be lessened somewhat.

This userscript:
- gathers all rows of all tables on a wiki page
- joins them on the first column (which is usually the name of whatever it is that's being compared)
- puts it all in a huge table at the top of the page
- and allows you to filter what columns you want to see
- as well as write complex logical expressions to filter rows!

## Filter expressions

The filter expressions are logical expressions over comparisons.

Currently supporting:
- case-insensitive equality operator: `'column name' = 'desired value'` (tries to take the locale from the Wikipedia domain name)
- case-insensitive "not-equals" operator `!=`
- their case-sensitive counterparts (`==` and `!==`)
- logical operators: `not`, `and`, `or`
- parentheses

Stay tuned for more features! Or help me implement them!

([Issue #1](https://github.com/ypoluektovich/wikitables/issues/1) is the tracking/roadmap issue for filter expressions features.)

## Installation

The script can be downloaded and installed from https://openuserjs.org/scripts/ypoluektovich/Wikitables. You can find more information on how to use userscripts at https://openuserjs.org/about/Userscript-Beginners-HOWTO.

After installing the script, you can try it out on, for example, [this Wikipedia page](https://en.wikipedia.org/wiki/Comparison_of_terminal_emulators). Look for the button just above the page title.

## Building

Sadly, you can't just take the `wikitables.user.js` file from the source tree and plug it into your browser directly. First you'll need to build the userscript. Don't worry, that's pretty easy.

- Install node.js and npm, if you don't have them.
- `npm install` to get all the node.js modules required for build.
- `npm run build`

There should now be a `dest` directory with your new userscript!

## Pull requests welcome!

^ this.

## License

ISC.
