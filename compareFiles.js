const fs = require('fs');

// Get the file paths from command-line arguments
const [file1Path, file2Path] = process.argv.slice(2);

// Read the contents of both files
const file1Contents = fs.readFileSync(file1Path, 'utf8');
const file2Contents = fs.readFileSync(file2Path, 'utf8');

// Split the contents of each file into arrays of lines
const file1Lines = file1Contents.split('\n');
const file2Lines = file2Contents.split('\n');

// Loop through each line in file1 and check if it's also in file2
let i = 0;
for (let line of file1Lines) {
  if (line !== file2Lines[i]) {
    console.log(i, line);
  }
  i++;
}
