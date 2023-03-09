// you must provide two .txt files as arguments

// script will log the outputs to console

const fs = require('fs');

// Get the file paths from command-line arguments
const [file1Path, file2Path] = process.argv.slice(2);

// Read the contents of both files
const file1Contents = fs.readFileSync(file1Path, 'utf8');
const file2Contents = fs.readFileSync(file2Path, 'utf8');

// Split the contents of each file into arrays of lines
const file1Lines = file1Contents.split(/\r?\n/).map(line => line.replace('\r', ''));
const file2Lines = file2Contents.split(/\r?\n/).map(line => line.replace('\r', ''));

// Loop through each line in file1 and check if it's also in file2
for (let i = 0; i < file1Lines.length; i++) {
  const file1Line = file1Lines[i];
  const file2Line = file2Lines[i];
  if (file1Line !== file2Line) {
    console.log(`${i} | ${file1Line} | ${file2Line}`);
  }
}
