// Import the file system module to work with files on the computer.
import * as fs from 'fs';


function createCSV(grades: student_info[]) {
  // Create a constant variable with the name of the file.
  const filepath = 'course_grades.csv'

  // Order the student's grades by the most quizzes taken throughout the course.
  grades.sort((a, b) => {
    const total_grades_a = a.first_quarter.length + a.second_quarter.length + a.third_quarter.length + a.fourth_quarter.length
    const total_grades_b = b.first_quarter.length + b.second_quarter.length + b.third_quarter.length + b.fourth_quarter.length

    return total_grades_b - total_grades_a
  })

  // Declare maximum variables to store the maximum quizzes taken each quarter
  let max_first_quarter = 0
  let max_second_quarter = 0
  let max_third_quarter = 0
  let max_fourth_quarter = 0

  grades.forEach(student => {
    max_first_quarter = Math.max(max_first_quarter, student.first_quarter.length)
    max_second_quarter = Math.max(max_second_quarter, student.second_quarter.length)
    max_third_quarter = Math.max(max_third_quarter, student.third_quarter.length)
    max_fourth_quarter = Math.max(max_fourth_quarter, student.fourth_quarter.length)
  })

  

  // Convert the list of grades to CSV string
  const csvContent = grades.map(row =>
    Object.values(row).join(',')
  ).join('\n');

  console.log('The data has been parsed succesfully.')

  // Write the CSV file
  fs.writeFile(filepath, csvContent, (err) => {
    if (err) {
      console.error('There was an error writing the CSV file:', err);
    } else {
      console.log("CSV file has been saved locally with the name 'course_grades.csv'.");
    }
  });
}

// Define an interface with the name and a list of grades per quarter for the student information.
interface student_info {
  name: string,
  first_quarter: number[],
  second_quarter: number[],
  third_quarter: number[],
  fourth_quarter: number[],
}

// Declare a dummy data to be replaced later with the actual grades from the database.
const grades: student_info[] = [
  {
    name: 'Charlie',
    first_quarter: [4.5, 4.8, 3],
    second_quarter: [4, 3.9, 2.5],
    third_quarter: [2.8, 3, 4],
    fourth_quarter: [4.3, 3.7, 2.5]
  },
  {
    name: 'Bob',
    first_quarter: [2.5, 3.5, 5],
    second_quarter: [3.7, 4.5, 2.5],
    third_quarter: [2.2, 3.5, 4.7],
    fourth_quarter: [3.8, 4.4, 5, 4.9]
  },
  {
    name: 'Alice',
    first_quarter: [2.5, 3.5, 5, 3],
    second_quarter: [3.3, 3.5, 4.5],
    third_quarter: [4, 3.9, 4.4, 3.8],
    fourth_quarter: [3, 4.5, 5]
  },
];

// Example use of the function 
createCSV(grades);
