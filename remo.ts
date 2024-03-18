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

  let headers = ['Name']

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

  // Define an arrow function to create the headers per quarter based on the number of quizzes
  const createHeader = (quarter: string, qty_quiz: number): string[] => {
    let headers: string[] = []

    for (let i = 1; i <= qty_quiz; i++) {
      headers.push(`${quarter}_quiz${i}`)
    }
    headers.push(`${quarter}_final`)

    return headers
  }

  // Create the headers per quarter
  headers.push(...createHeader('Q1', max_first_quarter))
  headers.push(...createHeader('Q2', max_second_quarter))
  headers.push(...createHeader('Q3', max_third_quarter))
  headers.push(...createHeader('Q4', max_fourth_quarter))

  /* 
    Calculate the final grade per quarter, for each student (without the missing grades). 
    Round the final grade to only 1 decimal. 
    Add 0 for every missing grade.
    Finally, add the final grade at the end of the quarter.
  */
  grades.forEach(student => {
    let quarter_length = student.first_quarter.length
    const final_first_quarter = Math.round((student.first_quarter.reduce((a, b) => a + b, 0)) / quarter_length * 10) / 10
    let missing_grades = max_first_quarter - quarter_length
    const new_grades = [...student.first_quarter, ...new Array(missing_grades).fill(0), final_first_quarter]
    student.first_quarter = new_grades

    quarter_length = student.second_quarter.length
    const final_second_quarter = Math.round((student.second_quarter.reduce((a, b) => a + b, 0)) / quarter_length * 10) / 10
    missing_grades = max_second_quarter - quarter_length
    const new_grades_second = [...student.second_quarter, ...new Array(missing_grades).fill(0), final_second_quarter]
    student.second_quarter = new_grades_second

    quarter_length = student.third_quarter.length
    const final_third_quarter = Math.round((student.third_quarter.reduce((a, b) => a + b, 0)) / quarter_length * 10) / 10
    missing_grades = max_third_quarter - quarter_length
    const new_grades_third = [...student.third_quarter, ...new Array(missing_grades).fill(0), final_third_quarter]
    student.third_quarter = new_grades_third

    quarter_length = student.fourth_quarter.length
    const final_fourth_quarter = Math.round((student.fourth_quarter.reduce((a, b) => a + b, 0)) / quarter_length * 10) / 10
    missing_grades = max_fourth_quarter - quarter_length
    const new_grades_fourth = [...student.fourth_quarter, ...new Array(missing_grades).fill(0), final_fourth_quarter]
    student.fourth_quarter = new_grades_fourth
  })

  // Convert the headers to CSV string.
  const headersString = headers.join(',') + '\n'

  // Convert the list of grades to CSV string. Replace all 0s with N/A
  const csvContent = grades.map(row =>
    Object.values(row).join(',')
  ).join('\n').replace(/,0,/g,',N/A,');

  console.log('The data has been parsed succesfully.')

  // Write the CSV file, including headers.
  fs.writeFile(filepath, headersString + csvContent, (err) => {
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
