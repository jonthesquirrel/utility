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

// Get the maximum line number length
const maxLineNumberLength = Math.max(file1Lines.length.toString().length, file2Lines.length.toString().length);

// Loop through each line in file1 and check if it's also in file2
for (let lineNumber = 0; lineNumber < file1Lines.length; lineNumber++) {
  const file1Line = file1Lines[lineNumber];
  const file2Line = file2Lines[lineNumber];
  const paddedLineNumber = (lineNumber + 1).toString().padStart(maxLineNumberLength, ' ');
  const paddedFile1Line = file1Line.padEnd(file1Line.length + (maxLineNumberLength - paddedLineNumber.length), '\t');
  if (file1Line !== file2Line) {
    console.log(`${paddedLineNumber}\t|\t${paddedFile1Line}\t|\t${file2Line}`);
  }
}
