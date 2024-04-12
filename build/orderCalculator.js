"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function cleanRaffleEntries(entries) {
    // An empty list of RaffleEntry objects the data that should be returned
    const results = [];
    // The regex pattern which will be used to check if the email address is valid
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // An entryCount list to keep count of how many entries each user has submitted using their email address
    const entryCountMap = new Map();
    // If the provided list of entries is empty, then return the empty lists of results.
    if (entries.length === 0)
        return results;
    // For loop to iterate over the provided list of entries
    for (let i = 0; i < entries.length; i++) {
        // Checking if the email address is valid for this entry. If not the raffle ticket is not valid
        if (emailPattern.test(entries[i].email)) {
            entries[i].email = entries[i].email.trim().toUpperCase();
        }
        else {
            console.log(`Entry with ID: ${entries[i].id} has an invalid email address.`);
            continue;
        }
        // Check if the user has entered before. If not the raffle ticket is not valid
        const currentCount = entryCountMap.get(entries[i].email) || 0;
        if (currentCount < 5) {
            entryCountMap.set(entries[i].email, currentCount + 1);
        }
        else {
            console.log(`Entrant with email: ${entries[i].email} has already enter 5 times.`);
            continue;
        }
        // Check if the user has 5 not null answers. If not the raffle ticket is not valid
        if (entries[i].answers.filter((answer) => answer != "").length == 5) {
            entries[i].answers = entries[i].answers.map((answer) => answer.trim().toUpperCase());
        }
        else {
            console.log(`Entry with ID: ${entries[i].id} has not answered all of the questions.`);
            continue;
        }
        // Check if the user first name, last name and phone are not null, if not remove the leading and trailing white spaces and upper case
        // If not the raffle ticket is not valid
        if (!!entries[i].firstName) {
            entries[i].firstName = entries[i].firstName.trim().toUpperCase();
        }
        else {
            console.log(`Entry with ID: ${entries[i].id} has an invalid first name.`);
            continue;
        }
        if (!!entries[i].lastName) {
            entries[i].lastName = entries[i].lastName.trim().toUpperCase();
        }
        else {
            console.log(`Entry with ID: ${entries[i].id} has an invalid last name.`);
            continue;
        }
        if (!!entries[i].phone) {
            entries[i].phone = entries[i].phone.trim().toUpperCase();
        }
        else {
            console.log(`Entry with ID: ${entries[i].id} has an invalid phone number.`);
            continue;
        }
        // Save the valid entry
        results.push(entries[i]);
    }
    return results;
}
exports.default = cleanRaffleEntries;
