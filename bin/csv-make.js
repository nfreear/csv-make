#!/usr/bin/env node

/*!
  Mobile Moodle: generate CSV for user import.

  ( 'otu' One-file npm-package Javascript. )

  © Nick Freear / 28-Sep-2018.
*/

/* {
  "name": "csv-make",
  "version": "1.0.0",
  "dependencies": {
    "jsonexport": "^2.3.0",
    "numeral": "^2.0.6"
  },
  "scripts": {
    "build": "node ./cli.js > data.csv"
  }
} */

const _PKG_ = `
dependencies:
  jsonexport: ^2.3.0
  numeral: ^2.0.6
`;

const jsonexport = require('jsonexport');
const numeral = require('numeral');
// const CONFIG = require('./config.json');

const ROW_START = 501;
const ROW_END = 520; // CONFIG.rowCount; // 500;
// username,password,firstname,lastname,email,course1,role1,maildisplay,country
// xxx001,yyyy001zzzz,Joe,001,xxx+TAG-001@example.com,EXAMPLE,student,0,ZZ
// xxx002,yyyy002zzzz,Joe,002,xxx+TAG-002@example.com,EXAMPLE,student,0,ZZ
const COLUMNS = {
  "username": "xxx{n000}",        // sl%03d, sl001
  "password": "yyyy{n000}zzz",  // sL-%03d, sL-001001
  "firstname": "Joe",
  "lastname": "{n000}",
  "email": "xxx+TAG-{n000}@example.com",
  "course1": "EXAMPLE",
  "role1": "student",
  "maildisplay": "0",
  "country": "ZZ"
};

const NUM_REGEX = /(.*?)\{n(000)\}(.*)/;
const NUM_REGEX_2 = /(.*?)\{n(000)\}\{n(000)\}(.*)/;

let rows = [];

for (let idx = ROW_START; idx <= ROW_END; idx++) {
  let row = {};

  for (var key in COLUMNS) {
    let column = COLUMNS[ key ];
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
