function createMeetingRoomingSystem() {
    // Creating an empty array to store the roomId, start time, and end time of the meeting.
    let bookings = [];
    /**
     * This function checks whether the room ID has been filled for a particular period.
     * @param roomId :string
     * @param start Date
     * @param end Date
     * @returns true if the booking is available, otherwise false
     */
    function isRoomAvailable(roomId, start, end) {
        // Checking for any empty or invalid parameters
        if (!roomId || !start || !end) {
            throw new Error("Invalid parameters");
        }
        // returns if the meeting bookings are available
        return !bookings.some((booking) => booking.roomId === roomId &&
            ((start >= booking.start && start < booking.end) ||
                (end > booking.start && end <= booking.end) ||
                (start <= booking.start && end >= booking.end)));
    }
    /**
     * This function calculates the end date by taking the start date and duration of the meeting,
     * adds booking details into the bookings array, and then logs the output whether the
     * meeting room has been booked or not
     * @param roomId
     * @param start
     * @param durationInHours
     * @returns true if the booking is successfully booked, otherwise false
     */
    function bookRoom(roomId, start, durationInHours) {
        // Checking for any empty or invalid parameters
        if (!roomId || !start || durationInHours <= 0) {
            throw new Error("Invalid parameters");
        }
        // Calculating the end time using start date and duration  of the meeting
        const end = new Date(start.getTime() + durationInHours * 60 * 60 * 1000);
        // Checking whether the room is available
        if (isRoomAvailable(roomId, start, end)) {
            // Adding the room details to the booking array
            bookings.push({ roomId, start, end });
            console.log(`Room ${roomId} booked at ${start} to ${end}`);
            // Returns true if room has been booked
            return true;
        }
        else {
            console.log(`Room ${roomId} could not be booked from ${start} to ${end}`);
            // Returns false if room not booked
            return false;
        }
    }
    /**
     * This function cancel the existing booking by removing the booking details from the booking array
     * @param roomId
     * @param start
     * @param end
     * @returns true if the booking is successfully cancelled, otherwise false
     */
    function cancelBooking(roomId, start, end) {
        // Using flag to return after booking has been cancelled.
        let found = false;
        // Checking for any empty or invalid parameters
        if (!roomId || !start || !end) {
            throw new Error("Invalid parameters");
        }
        for (let i = 0; i < bookings.length; i++) {
            const booking = bookings[i];
            // Checking for the room that need to be cancelled using room id and start and end time
            if (booking.roomId === roomId &&
                booking.start.getTime() === start.getTime() &&
                booking.end.getTime() === end.getTime()) {
                bookings.splice(i, 1); // Removing the room booking details form the array
                console.log(`Booked room ${roomId} from ${start} to ${end} cancelled.`);
                found = true;
                break;
            }
        }
        if (!found) {
            console.log(`No room found with ${roomId} from ${start} to ${end}`);
        }
        return found;
    }
    return { bookRoom, isRoomAvailable, cancelBooking };
}
// Test cases
const meetingRoom = createMeetingRoomingSystem();
try {
    meetingRoom.bookRoom("", new Date("2024-05-20T09:00:00"), 1);
    meetingRoom.bookRoom("Meeting2", new Date("2024-05-20T10:00:00"), 2);
}
catch (error) {
    console.error(`Error occurred while booking the rooom for the meeting: ${error.message}`);
}
try {
    meetingRoom.cancelBooking("", new Date("2024-05-20T10:00:00"), new Date("2024-05-20T12:00:00"));
}
catch (error) {
    console.error(`Error occurred while cancelling the rooom: ${error.message}`);
}
