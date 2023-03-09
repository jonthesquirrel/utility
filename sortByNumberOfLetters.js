const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const inputFile = 'input.csv';
const outputFile = 'output.csv';

// Define the CSV writer configuration
const csvWriter = createCsvWriter({
    path: outputFile,
    header: [
        { id: 'column', title: 'Column' }
    ]
});

// Read the CSV file and sort the data
const data = [];
fs.createReadStream(inputFile)
    .pipe(csv({ headers: false }))
    .on('data', (row) => {
        data.push(row[0]);
    })
    .on('end', () => {
        // Sort the data by the number of letters in the column
        data.sort((a, b) => {
            return a.length - b.length;
        });

        // Write the sorted data to a new CSV file without a header row
        const records = data.map((value) => {
            return { column: value };
        });

        csvWriter.writeRecords(records)
            .then(() => {
                console.log(`Successfully sorted and saved to ${outputFile}`);
            })
            .catch((error) => {
                console.error(`Error writing CSV file: ${error}`);
            });

        // Remove the header row from the output file
        fs.readFile(outputFile, 'utf-8', (error, data) => {
            if (error) {
                console.error(`Error reading CSV file: ${error}`);
                return;
            }

            const updatedData = data.replace(/^.*?\n/, '');
            fs.writeFile(outputFile, updatedData, (error) => {
                if (error) {
                    console.error(`Error writing CSV file: ${error}`);
                } else {
                    console.log(`Successfully removed header from ${outputFile}`);
                }
            });
        });
    });
