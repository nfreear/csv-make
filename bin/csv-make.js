#!/usr/bin/env node

/*!
  Generate a CSV file to import user accounts into Moodle.

  © Nick Freear / 28-Sep-2018.
*/

// username,password,firstname,lastname,email,course1,role1,maildisplay,country
// xxx001,yyyy001zzzz,Joe,001,xxx+TAG-001@example.com,EXAMPLE,student,0,ZZ
// xxx002,yyyy002zzzz,Joe,002,xxx+TAG-002@example.com,EXAMPLE,student,0,ZZ

const CONFIG = (() => {
  try {
    const ALL_CONFIG = require('../config.json');
    const CFG_GROUP = ALL_CONFIG.group;

    console.warn('Configuration group:', CFG_GROUP);

    const CONFIG = ALL_CONFIG[ CFG_GROUP ];

    CONFIG.numRegex = ALL_CONFIG.numRegex;
    CONFIG.numRegex_2 = ALL_CONFIG.numRegex_2;

    return CONFIG;

  } catch (ex) {
    console.error('ERROR:', ex.message, Object.getPrototypeOf(ex));
    // console.error(ex)
    process.exit(2);
  }
})();

const jsonexport = require('jsonexport');
const numeral = require('numeral');

const NUM_REGEX = new RegExp(CONFIG.numRegex);
const NUM_REGEX_2 = new RegExp(CONFIG.numRegex_2);
const COMMENT_REGEX = /^#/;

const COUNT = CONFIG.rowEnd - CONFIG.rowStart + 1;

console.warn('Count of rows to be generated: ', COUNT);

let rows = [];

for (let idx = CONFIG.rowStart; idx <= CONFIG.rowEnd; idx++) {
  let row = {};

  for (var key in CONFIG.columns) {
    let column = CONFIG.columns[ key ];
    // console.warn(idx, key, column);

    let m = column.match(NUM_REGEX);
    let m2 = column.match(NUM_REGEX_2);

    let mc = key.match(COMMENT_REGEX); // Note: 'key'

    // console.log(idx, m);

    if (mc) {
      // Skip comments ...
    } else if (m2) {
      row[ key ] = m[ 1 ] + numeral(idx).format(m[ 2 ]) + numeral(idx).format(m[ 3 ]) + ( m[ 4 ] || '');
    } else if (m) {
      row[ key ] = m[ 1 ] + numeral(idx).format(m[ 2 ]) + (m[ 3 ] || '');
    } else {
      row[ key ] = column;
    }
  }
  rows.push(row);
}

jsonexport(rows, function (err, csv) {
  if (err) return console.error(err);

  console.log(csv);
})

// End.
