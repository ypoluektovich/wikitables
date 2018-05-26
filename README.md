= Wikitables

Have you ever looked at a big Wikipedia article of the "Comparison of ..." variety, seen its many huge tables, and despaired? Well, now your despair is about to be lessened somewhat.

This userscript:
- gathers all rows of all tables on a wiki page
- joins them on the first column (which is usually the name of whatever it is that's being compared)
- puts it all in a huge table at the top of the page
- and allows you to filter what columns you want to see
- as well as write complex logical expressions to filter rows!

== Filter expressions

The filter expressions are logical expressions over comparisons.

Currently supporting:
- equality operator: `'column name' = 'desired value'`
- logical operators: `and`, `or`
- parentheses

Stay tuned for more features! Or help me implement them!

== Building

Sadly, you can't just take the `wikitables.user.js` file and plug it into your browser directly. First you'll need to build the userscript. Don't worry, that's pretty easy.

- Install node.js and npm, if you don't have them.
- `npm install` to get all the node.js modules required for build.
- `npm run build`

There should now be a `dest` directory with your new userscript!

== Pull requests welcome!

^ this.

== License

ISC.
