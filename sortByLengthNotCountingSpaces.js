// you must create an input.txt file with each piece of text you want sorted on a new line.
// script will create an output.txt file.

const fs = require('fs');

const inputFile = 'input.txt';
const outputFile = 'output.txt';

// Read the input file and sort the words
fs.readFile(inputFile, 'utf-8', (error, data) => {
    if (error) {
        console.error(`Error reading input file: ${error}`);
        return;
    }

    // Split the input text into an array of words
    const words = data.trim().split('\n');

    // Create a new array of objects, where each object contains the original word (with spaces)
    // and the cleaned word (without spaces)
    const cleanedWords = words.map(word => {
        return {
            original: word,
            cleaned: word.replace(/\s/g, '')
        };
    });

    // Sort the cleaned words by the number of letters
    cleanedWords.sort((a, b) => {
        return a.cleaned.length - b.cleaned.length;
    });

    // Join the sorted words into a single string, using the original words (with spaces)
    const outputText = cleanedWords.map(word => word.original).join('\n');

    // Write the sorted words to the output file
    fs.writeFile(outputFile, outputText, (error) => {
        if (error) {
            console.error(`Error writing output file: ${error}`);
        } else {
            console.log(`Successfully sorted and saved to ${outputFile}`);
        }
    });
});
