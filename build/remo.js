function cleanStudentData(student_data) {
    // Clean every field from leading or trailing spaces.
    student_data.last_name = student_data.last_name.trim();
    student_data.first_name = student_data.first_name.trim();
    // Replace more than 1 space with just one space.
    student_data.address = student_data.address.trim().replace(/\s{2,}/g, ' ');
    // Give the phone number the format of '3 digits - 3 digits - remaining digits'.
    const clean_phone_number = student_data.phone_number.trim().replace(/\D/g, '');
    student_data.phone_number = `${clean_phone_number.substring(0, 3)}-${clean_phone_number.substring(3, 6)}-${clean_phone_number.substring(6)}`;
    // Give the blood type the format of letters together and a space for the sign, e.g. 'AB -'.
    const blood_pattern = /^([A-Z]+)\s*(\+|-)$/;
    const match = student.blood_type.trim().match(blood_pattern);
    student.blood_type = `${match[1]} ${match[2]}`;
    // Give the ID the format of having a '.' character every 3 digits from the end.
    const clean_ID = student_data.ID.trim().replace(/\D/g, '');
    student_data.ID = clean_ID.split('').reverse().join('').replace(/(\d{3})/g, '$1.').split('').reverse().join('');
    return student_data;
}
const student = {
    first_name: 'Sebastian ',
    last_name: 'Perez Silva',
    address: 'Calle 2 # 1 -  10 ',
    blood_type: ' AB-',
    ID: '1165365955',
    phone_number: '3658859512',
};
console.log(cleanStudentData(student));
