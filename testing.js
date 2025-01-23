const fs = require('fs');
const moment = require('moment');

function saveGradesToCSV(students, courseName) {
    let csvContent = 'Student,';
    let maxQuizzesPerQuarter = [0, 0, 0, 0];

    // Find the maximum number of quizzes in each quarter
    for (let student of students) {
        for (let quarter = 0; quarter < 4; quarter++) {
            maxQuizzesPerQuarter[quarter] = Math.max(maxQuizzesPerQuarter[quarter], student.grades[quarter].length);
        }
    }

    // Create the header row
    for (let quarter = 0; quarter < 4; quarter++) {
        for (let quiz = 0; quiz < maxQuizzesPerQuarter[quarter]; quiz++) {
            csvContent += `Q${quarter + 1}_Quiz${quiz + 1},`;
        }
        csvContent += `Q${quarter + 1}_grade,`;
    }
    csvContent += 'Final_grade\n';

    // Create the rows for each student
    for (let student of students) {
        csvContent += `${student.name},`;
        let finalGrade = 0;
        for (let quarter = 0; quarter < 4; quarter++) {
            let quarterGrade = 0;
            for (let quiz = 0; quiz < maxQuizzesPerQuarter[quarter]; quiz++) {
                if (quiz < student.grades[quarter].length) {
                    csvContent += `${student.grades[quarter][quiz]},`;
                    quarterGrade += student.grades[quarter][quiz];
                } else {
                    csvContent += ',';
                }
            }
            quarterGrade /= student.grades[quarter].length;
            csvContent += `${quarterGrade.toFixed(2)},`;
            finalGrade += quarterGrade;
        }
        finalGrade /= 4;
        csvContent += `${finalGrade.toFixed(2)}\n`;
    }

    // Save the CSV content to a file
    const date = moment().format('YY-MM-DD');
    const filename = `${date}-${courseName}.csv`;
    fs.writeFile(filename, csvContent, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log(`Grades saved to ${filename}`);
        }
    });
}

// Example data
const students = [
    {
        name: 'John Doe',
        grades: [[4, 5, 4], [3, 4, 5], [5, 5, 4], [4, 5, 5]]
    },
    {
        name: 'Jane Doe',
        grades: [[5, 5, 5], [4, 4, 4], [3, 3, 3], [2, 2, 2]]
    },
    {
        name: 'Jim Doe',
        grades: [[4, 4, 4], [3, 3, 3], [5, 5, 5], [4, 4, 4]]
    }
];

saveGradesToCSV(students, 'Course');