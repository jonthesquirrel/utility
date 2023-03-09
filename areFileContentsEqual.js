// run with two text files as arguments

const fs = require('fs');
const file1 = process.argv[2];
const file2 = process.argv[3];

if (!file1 || !file2) {
  console.error('Please provide two file paths as arguments');
  process.exit(1);
}

const content1 = fs.readFileSync(file1, 'utf8');
const content2 = fs.readFileSync(file2, 'utf8');

if (content1 === content2) {
  console.log('The contents of the files are equal');
} else {
  console.log('The contents of the files are not equal');
}
