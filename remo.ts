import * as fs from 'fs';

function createCSV(data: any[], filepath: string) {
  // Convert array of objects to CSV string
  const csvContent = data.map(row =>
    Object.values(row).join(',')
  ).join('\n');

  // Write to a file
  fs.writeFile(filepath, csvContent, (err) => {
    if (err) {
      console.error('There was an error writing the CSV file:', err);
    } else {
      console.log('CSV file has been saved.');
    }
  });
}

// Example usage
const data = [
  { id: 1, name: 'Alice', score: 88 },
  { id: 2, name: 'Bob', score: 92 },
  { id: 3, name: 'Charlie', score: 90 },
];
createCSV(data, 'example.csv');
