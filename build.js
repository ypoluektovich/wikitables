'use strict';

const fs = require('fs-extra');
const peg = require("pegjs");

async function read(filename) {
  return fs.readFile(filename, {encoding: 'utf-8'});
}

function generateParser(grammar) {
  return peg.generate(
    grammar,
    {
      output: 'source',
      format: 'globals',
      exportVar: 'PARSER'
    }
  );
}

function spliceParser(userjsAndParser) {
  return userjsAndParser[0].replace("'PARSER';", userjsAndParser[1]);
}

async function build() {
  const readUserJs = read('./wikitables.user.js');
  const prepareParserJs = read('./peg.txt').then(generateParser);
  const buildJs = Promise.all([readUserJs, prepareParserJs]).then(spliceParser);
  await Promise.all([fs.ensureDir('./dest'), buildJs])
    .then(x => x[1])
    .then(js => fs.writeFile('./dest/wikitables.user.js', js, {encoding: 'utf-8'}));
}

build().catch((e) => {
  console.error(e);
  process.exit(1);
});
