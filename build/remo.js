function cleanStudentData(student_data) {
    // Clean every field from leading or trailing spaces.
    student_data.first_name = student_data.first_name.trim();
    student_data.last_name = student_data.last_name.trim();
    student_data.address = student_data.address.trim();
    student_data.blood_type = student_data.blood_type.trim();
    student_data.phone_number = student_data.phone_number.trim();
    student_data.ID = student_data.ID.trim();
    // If a field is missing append the message
    let missing_data = '';
    if (!student_data.first_name)
        missing_data += 'First name field is empty. ';
    if (!student_data.last_name)
        missing_data += 'Last name field is empty. ';
    // Replace more than 1 space with just one space.
    if (student_data.address) {
        student_data.address = student_data.address.replace(/\s{2,}/g, ' ');
    }
    else {
        missing_data += 'Address field is empty. ';
    }
    // Give the phone number the format of '3 digits - 3 digits - remaining digits'.
    if (student_data.phone_number) {
        const clean_phone_number = student_data.phone_number.replace(/\D/g, '');
        student_data.phone_number = `${clean_phone_number.substring(0, 3)}-${clean_phone_number.substring(3, 6)}-${clean_phone_number.substring(6)}`;
    }
    else {
        missing_data += 'Phone number field is empty. ';
    }
    // Give the blood type the format of letters together and a space for the sign, e.g. 'AB -'.
    if (student_data.blood_type) {
        const blood_pattern = /^([A-Z]+)\s*(\+|-)$/;
        const match = student_data.blood_type.match(blood_pattern);
        student_data.blood_type = `${match[1]} ${match[2]}`;
    }
    else {
        missing_data += 'Blood type field is empty. ';
    }
    // Give the ID the format of having a '.' character every 3 digits from the end.
    if (student_data.ID) {
        const clean_ID = student_data.ID.replace(/\D/g, '');
        student_data.ID = clean_ID.split('').reverse().join('').replace(/(\d{3})/g, '$1.').split('').reverse().join('');
    }
    else {
        missing_data += 'ID field is empty.';
    }
    if (missing_data)
        student_data.missing_data = missing_data.trim();
    return student_data;
}
const student = {
    first_name: 'Sebastian ',
    last_name: 'Perez Silva',
    address: 'Calle 2 # 1 -  10 ',
    blood_type: ' AB-',
    ID: '1165365955',
    phone_number: '  ',
};
console.log(cleanStudentData(student));
