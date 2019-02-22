#!/usr/bin/env node

/*!
  Moodle: generate a CSV file for user import.

  © Nick Freear / 28-Sep-2018.
*/

// username,password,firstname,lastname,email,course1,role1,maildisplay,country
// xxx001,yyyy001zzzz,Joe,001,xxx+TAG-001@example.com,EXAMPLE,student,0,ZZ
// xxx002,yyyy002zzzz,Joe,002,xxx+TAG-002@example.com,EXAMPLE,student,0,ZZ

const CONFIG = require('../config.json');

const jsonexport = require('jsonexport');
const numeral = require('numeral');

const NUM_REGEX = new RegExp(CONFIG.numRegex);
const NUM_REGEX_2 = new RegExp(CONFIG.numRegex_2);

let rows = [];

for (let idx = CONFIG.rowStart; idx <= CONFIG.rowEnd; idx++) {
  let row = {};

  for (var key in CONFIG.columns) {
    let column = CONFIG.columns[ key ];
    // console.log(idx, key, column);

    let m = column.match(NUM_REGEX);
    let m2 = column.match(NUM_REGEX_2);

    // console.log(idx, m);

    if (m2) {
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
